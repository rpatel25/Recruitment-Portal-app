import {
  PasswordStrength,
  PasswordStrengthRequirements,
  PasswordRequirement,
  PasswordValidation,
  PasswordStrengthLevel,
  PasswordValidationConfig
} from '../types/password';

/**
 * Default password validation configuration
 */
const DEFAULT_CONFIG: PasswordValidationConfig = {
  minLength: 10,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  specialCharPattern: '!@#$%^&*()_+\\-=\\[\\]{}|;:,.<>?'
};

/**
 * Password validation utility class
 */
export class PasswordValidator implements PasswordValidation {
  private config: PasswordValidationConfig;

  constructor(config: PasswordValidationConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  /**
   * Validates password and returns strength information
   */
  validate(password: string): PasswordStrength {
    const requirements = this.checkAllRequirements(password);
    const score = this.calculateScore(requirements);
    const isValid = this.isPasswordValid(requirements);

    return {
      score,
      requirements,
      isValid
    };
  }

  /**
   * Gets all password requirements with their current status
   */
  getRequirements(): PasswordRequirement[] {
    return [
      {
        id: 'length',
        label: `At least ${this.config.minLength} characters`,
        regex: new RegExp(`^.{${this.config.minLength},}$`),
        isMet: false
      },
      {
        id: 'uppercase',
        label: 'At least one uppercase letter (A-Z)',
        regex: /[A-Z]/,
        isMet: false
      },
      {
        id: 'lowercase',
        label: 'At least one lowercase letter (a-z)',
        regex: /[a-z]/,
        isMet: false
      },
      {
        id: 'number',
        label: 'At least one number (0-9)',
        regex: /\d/,
        isMet: false
      },
      {
        id: 'specialChar',
        label: 'At least one special character',
        regex: new RegExp(`[${this.config.specialCharPattern}]`),
        isMet: false
      }
    ];
  }

  /**
   * Checks all password requirements
   */
  private checkAllRequirements(password: string): PasswordStrengthRequirements {
    return {
      length: this.checkLength(password),
      uppercase: this.checkUppercase(password),
      lowercase: this.checkLowercase(password),
      number: this.checkNumber(password),
      specialChar: this.checkSpecialChar(password)
    };
  }

  /**
   * Calculates password strength score (0-100)
   */
  private calculateScore(requirements: PasswordStrengthRequirements): number {
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const totalRequirements = Object.keys(requirements).length;
    return Math.round((metRequirements / totalRequirements) * 100);
  }

  /**
   * Determines if password meets all requirements
   */
  private isPasswordValid(requirements: PasswordStrengthRequirements): boolean {
    return Object.values(requirements).every(Boolean);
  }

  /**
   * Checks if password meets minimum length requirement
   */
  private checkLength(password: string): boolean {
    return password.length >= this.config.minLength;
  }

  /**
   * Checks if password contains at least one uppercase letter
   */
  private checkUppercase(password: string): boolean {
    return this.config.requireUppercase ? /[A-Z]/.test(password) : true;
  }

  /**
   * Checks if password contains at least one lowercase letter
   */
  private checkLowercase(password: string): boolean {
    return this.config.requireLowercase ? /[a-z]/.test(password) : true;
  }

  /**
   * Checks if password contains at least one number
   */
  private checkNumber(password: string): boolean {
    return this.config.requireNumber ? /\d/.test(password) : true;
  }

  /**
   * Checks if password contains at least one special character
   */
  private checkSpecialChar(password: string): boolean {
    if (!this.config.requireSpecialChar) return true;
    const regex = new RegExp(`[${this.config.specialCharPattern}]`);
    return regex.test(password);
  }
}

/**
 * Individual password requirement checking functions
 */
export const checkLength = (password: string, minLength: number = DEFAULT_CONFIG.minLength): boolean => {
  return password.length >= minLength;
};

export const checkUppercase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

export const checkLowercase = (password: string): boolean => {
  return /[a-z]/.test(password);
};

export const checkNumber = (password: string): boolean => {
  return /\d/.test(password);
};

export const checkSpecialChar = (password: string, pattern: string = DEFAULT_CONFIG.specialCharPattern): boolean => {
  const regex = new RegExp(`[${pattern}]`);
  return regex.test(password);
};

/**
 * Gets password strength level based on score
 */
export const getPasswordStrengthLevel = (score: number): PasswordStrengthLevel => {
  if (score >= 80) return PasswordStrengthLevel.STRONG;
  if (score >= 50) return PasswordStrengthLevel.MEDIUM;
  return PasswordStrengthLevel.WEAK;
};

/**
 * Calculates password strength with default configuration
 */
export const calculatePasswordStrength = (password: string): PasswordStrength => {
  const validator = new PasswordValidator();
  return validator.validate(password);
};

/**
 * Gets password requirements with current status for a given password
 */
export const getPasswordRequirementsStatus = (password: string): PasswordRequirement[] => {
  const validator = new PasswordValidator();
  const requirements = validator.getRequirements();
  
  return requirements.map(req => ({
    ...req,
    isMet: req.regex.test(password)
  }));
};

/**
 * Checks if password meets all security requirements
 */
export const isPasswordSecure = (password: string): boolean => {
  const strength = calculatePasswordStrength(password);
  return strength.isValid;
};
