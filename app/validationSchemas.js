import Joi from "joi";

// Schema used to select anything using its id
export const selectionSchema = Joi.object({
  id: Joi.string().uuid().required()
});

// User validation schemas
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'L\'adresse email doit être valide.',
    'any.required': 'L\'adresse email doit être renseignée'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
    'any.required': 'Le mot de passe doit être renseigné'
  })
});

export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'L\'adresse email doit être valide.',
    'any.required': 'L\'adresse email doit être renseignée'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
    'any.required': 'Le mot de passe doit être renseigné'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Le mot de passe et sa confirmation sont différents'
  }),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required().messages({
    'string.pattern.base': 'Le prénom contient des caractères invalides',
    'any.required': 'Le prénom doit être renseigné'
  }),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required().messages({
    'string.pattern.base': 'Le nom contient des caractères invalides',
    'any.required': 'Le nom doit être renseigné'
  })
});

export const userModificationSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'L\'adresse email doit être valide.'
  }),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).messages({
    'string.pattern.base': 'Le prénom contient des caractères invalides',
    'string.empty': 'Le prénom ne peut pas être vide'
  }),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).messages({
    'string.pattern.base': 'Le nom contient des caractères invalides',
    'string.empty': 'Le nom ne peut pas être vide'
  }),
  avatarUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'L\'avatar doit avoir une adresse valide'
  }),
  address: Joi.string().allow('')
});

export const passwordModificationSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    'string.min': 'L\'ancien mot de passe doit contenir au moins {#limit} caractères',
    'any.required': 'L\'ancien mot de passe doit être renseigné'
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.min': 'Le nouveau mot de passe doit contenir au moins {#limit} caractères',
    'any.required': 'Le nouveau mot de passe doit être renseigné'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Le nouveau mot de passe et sa confirmation sont différents',
    'any.required': 'La confirmation doit être renseignée'
  })
});

// Card validation schemas
export const cardCreationSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Le titre doit être renseigné'
  }),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens').required().messages({
    'any.only': 'La catégorie doit être au choix : Mes offres, Mes candidatures, Mes relances ou Mes entretiens',
    'any.required': 'La catégorie doit être renseignée'
  }),
  enterpriseName : Joi.string().required().messages({
    'any.required': 'L\'entreprise doit être renseignée'
  }),
  enterpriseActivity : Joi.string().allow(''),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre').required().messages({
    'any.only': 'La catégorie doit être au choix : CDI, CDD, Alternance ou Autre',
    'any.required': 'Le type de contrat doit être renseigné'
  }),
  offerUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Le lien de l\'offre doit être une adresse valide'
  }),
  location: Joi.string().allow(''),
  salary: Joi.string().allow(''),
  jobTitle: Joi.string().allow(''),
  rating: Joi.number().integer().min(0).max(5).messages({
    'number.base': 'La note doit être un entier compris entre 0 et 5'
  }),
  color: Joi.string(),
  comments: Joi.string().allow(''),
  reminder: Joi.date().allow(''),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Le lien du logo doit avoir une adresse valide'
  })
});

export const cardModificationSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'L\'id doit être renseigné'
  }),
  title: Joi.string(),
  category: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens').messages({
    'any.only': 'La catégorie doit être au choix : Mes offres, Mes candidatures, Mes relances ou Mes entretiens'
  }),
  enterpriseName : Joi.string(),
  enterpriseActivity : Joi.string().allow(''),
  contractType: Joi.string().valid('CDI', 'CDD', 'Alternance', 'Autre').messages({
    'any.only': 'La catégorie doit être au choix : CDI, CDD, Alternance ou Autre'
  }),
  offerUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Le lien de l\'offre doit être une adresse valide'
  }),
  location: Joi.string().allow(''),
  salary: Joi.string().allow(''),
  jobTitle: Joi.string().allow(''),
  rating: Joi.number().integer().min(0).max(5).messages({
    'number.base': 'La note doit être un nombre compris entre 0 et 5',
    'number.min': 'La note doit être supérieure ou égale à 0',
    'number.max': 'La note doit être inférieure ou égale à 5'
  }),
  color: Joi.string().messages({
    'string.empty': 'La couleur ne doit pas être vide.'
  }),
  comments: Joi.string().allow(''),
  reminder: Joi.date().allow(''),
  logoUrl: Joi.string().uri().allow('').messages({
    'string.uri': 'Le lien du logo doit avoir une adresse valide'
  })
});

export const cardMovingSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'L\'id doit être renseigné'
  }),
  newIndex: Joi.number().integer().min(0).required().messages({
    'any.required': 'L\'index doit être renseigné',
    'number.min': 'L\'index doit être supérieur ou égal à 0'
  }),
  newCategory: Joi.string().valid('Mes offres', 'Mes candidatures', 'Mes relances', 'Mes entretiens').required().messages({
    'any.only': 'La catégorie doit être au choix : Mes offres, Mes candidatures, Mes relances ou Mes entretiens'
  })
});


// Contact validation schemas
export const contactCreationSchema = Joi.object({
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required().messages({
    'string.pattern.base': 'Le prénom contient des caractères invalides',
    'any.required': 'Le prénom doit être renseigné'
  }),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).required().messages({
    'any.required': 'Le nom doit être renseigné',
    'string.pattern.base': 'Le nom contient des caractères invalides'
  }),
  occupation: Joi.string().allow(''),
  email: Joi.string().email().allow('').messages({
    'string.email': 'L\'adresse email doit être valide.'
  }),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/).allow('').messages({
    'string.pattern.base': 'Le format du numéro de téléphone n\'est pas valide'
  }),
  linkedinProfile: Joi.string().uri().allow('').messages({
    'string.uri': 'Le profil LinkedIn doit être une adresse valide'
  }),
  enterprise: Joi.string().allow(''),
  comments: Joi.string().allow(''),
  color: Joi.string().messages({
    'string.empty': 'La couleur ne doit pas être vide.'
  })
});

export const contactModificationSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'L\'id doit être renseigné'
  }),
  firstName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).messages({
    'string.pattern.base': 'Le prénom contient des caractères invalides'
  }),
  lastName: Joi.string().regex(/^[a-zA-ZÀ-ÿ' -]+$/).messages({
    'string.pattern.base': 'Le nom contient des caractères invalides',
  }),
  occupation: Joi.string().allow(''),
  email: Joi.string().email().allow('').messages({
    'string.email': 'L\'adresse email doit être valide.'
  }),
  phone: Joi.string().regex(/^(\+|\d{1,3})([\s.-]?\d+)+$/).allow('').messages({
    'string.pattern.base': 'Le format du numéro de téléphone n\'est pas valide'
  }),
  linkedinProfile: Joi.string().uri().allow('').messages({
    'string.uri': 'Le profil LinkedIn doit être une adresse valide'
  }),
  enterprise: Joi.string().allow(''),
  comments: Joi.string().allow(''),
  color: Joi.string().messages({
    'string.empty': 'La couleur ne doit pas être vide.'
  })
});

// Document validation schemas
export const documentCreationSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Le titre doit être renseigné'
  }),
  url: Joi.string().required().messages({
    'any.required': 'Le lien doit être renseigné'
  }),
  type: Joi.string().valid('CV', 'Lettre de motivation', 'Autre').required().messages({
    'any.only': 'La catégorie doit être au choix : CV, Lettre de motivation ou Autre',
    'any.required': 'Le type de document doit être renseigné'
  })
});

export const documentModificationSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'any.required': 'L\'id doit être renseigné'
  }),
  title: Joi.string().messages({
    'string.empty': 'Le titre ne doit pas être vide.'
  }),
  type: Joi.string().valid('CV', 'Lettre de motivation', 'Autre').messages({
    'any.only': 'La catégorie doit être au choix : CV, Lettre de motivation ou Autre'
  })
});