import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    return this.check(route.data?.['roles']);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, _segments: UrlSegment[]): boolean | UrlTree {
    return this.check(route.data?.['roles']);
  }

  private check(roles: string[] | undefined): boolean | UrlTree {
    const user = this.userService.getCurrentUser();
    if (!user) {
      return this.router.createUrlTree(['/login']);
    }
    if (!roles || roles.length === 0) {
      return true;
    }
    return this.userService.hasAnyRole(roles)
      ? true
      : this.router.createUrlTree(['/forbidden']);
  }
}
