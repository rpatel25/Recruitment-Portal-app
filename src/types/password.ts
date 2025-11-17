export interface PasswordRequirement {
  id: string;
  label: string;
  regex: RegExp;
  isMet: boolean;
}

export interface PasswordStrengthRequirements {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
}

export interface PasswordStrength {
  score: number; // 0-100
  requirements: PasswordStrengthRequirements;
  isValid: boolean;
}

export interface PasswordValidation {
  validate(password: string): PasswordStrength;
  getRequirements(): PasswordRequirement[];
}

export enum PasswordStrengthLevel {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong'
}

export interface PasswordValidationConfig {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  specialCharPattern: string;
}