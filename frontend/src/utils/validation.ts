export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Validar formato de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar telefone (formato simples: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

// Validar senha (mínimo 8 caracteres, pelo menos uma letra e um número)
export const isValidPassword = (senha: string): ValidationError | null => {
  const errors: string[] = [];

  if (senha.length < 8) {
    errors.push("• Mínimo 8 caracteres");
  }

  if (!/[a-zA-Z]/.test(senha)) {
    errors.push("• Deve conter pelo menos uma letra");
  }

  if (!/[0-9]/.test(senha)) {
    errors.push("• Deve conter pelo menos um número");
  }

  if (errors.length > 0) {
    return {
      field: "senha",
      message: errors.join("\n")
    };
  }

  return null;
};

// Validar cadastro
export const validateSignUp = (
  nome: string,
  email: string,
  senha: string,
  confirmaSenha: string
): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validar nome
  if (!nome.trim()) {
    errors.push({
      field: "nome",
      message: "Nome é obrigatório"
    });
  }

  // Validar email
  if (!email.trim()) {
    errors.push({
      field: "email",
      message: "Email é obrigatório"
    });
  } else if (!isValidEmail(email)) {
    errors.push({
      field: "email",
      message: "Email inválido"
    });
  }

  // Validar senha
  if (!senha) {
    errors.push({
      field: "senha",
      message: "Senha é obrigatória"
    });
  } else {
    const senhaError = isValidPassword(senha);
    if (senhaError) {
      errors.push(senhaError);
    }
  }

  // Validar confirmação de senha
  if (!confirmaSenha) {
    errors.push({
      field: "confirmaSenha",
      message: "Confirmação de senha é obrigatória"
    });
  } else if (senha !== confirmaSenha) {
    errors.push({
      field: "confirmaSenha",
      message: "As senhas não conferem"
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validar login
export const validateLogin = (email: string, senha: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!email.trim()) {
    errors.push({
      field: "email",
      message: "Email é obrigatório"
    });
  } else if (!isValidEmail(email)) {
    errors.push({
      field: "email",
      message: "Email inválido"
    });
  }

  if (!senha) {
    errors.push({
      field: "senha",
      message: "Senha é obrigatória"
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
