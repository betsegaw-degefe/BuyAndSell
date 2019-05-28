import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountEndpoint {

  private readonly _usersUrl: string = '/api/account/users';
  private readonly _userByUserNameUrl: string = '/api/account/users/username';
  private readonly _currentUserUrl: string = '/api/account/users/me';
  private readonly _currentUserPreferencesUrl: string = '/api/account/users/me/preferences';
  private readonly _unblockUserUrl: string = '/api/account/users/unblock';
  private readonly _rolesUrl: string = '/api/account/roles';
  private readonly _roleByRoleNameUrl: string = '/api/account/roles/name';
  private readonly _permissionsUrl: string = '/api/account/permissions';
  constructor() { }
}
