export enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required',
  NO_LOWER_CASE = 'lower case letter required',
  NO_NUMBER = 'At least one number is required',
}

export interface CheckResult {
  valid: Boolean;
  reasons: string[];
}

export class PasswordChecker {
  public checkPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = [];
    this.checkForLength(password, reasons);
    this.checkForUppercase(password, reasons);
    this.checkForLowerCase(password, reasons);
    return {
      valid: reasons.length > 0 ? false : true,
      reasons,
    };
  }

  public checkAdminPassword(password: string): CheckResult {
    const basicCheck = this.checkPassword(password);
    this.checkforNumber(password, basicCheck.reasons as PasswordErrors[]);
    return {
      valid: basicCheck.reasons.length > 0 ? false : true,
      reasons: basicCheck.reasons,
    };
  }

  private checkforNumber(password: string, reasons: PasswordErrors[]) {
    const hasNumber = /\d/;
    if (!hasNumber.test(password)) {
      reasons.push(PasswordErrors.NO_NUMBER);
    }
  }

  private checkForLength(password: string, reasons: PasswordErrors[]) {
    if (password.length < 8) {
      reasons.push(PasswordErrors.SHORT);
    }
  }

  private checkForUppercase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toUpperCase()) {
      reasons.push(PasswordErrors.NO_LOWER_CASE);
    }
  }

  private checkForLowerCase(password: string, reasons: PasswordErrors[]) {
    if (password == password.toLowerCase()) {
      reasons.push(PasswordErrors.NO_UPPER_CASE);
    }
  }
}
