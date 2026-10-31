import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem(`socialToken`)) {
    req = req.clone({
    setHeaders:{
      Authorization:`Bearer ${localStorage.getItem(`socialToken`)}`
    }
  });
}
return next(req)
};
