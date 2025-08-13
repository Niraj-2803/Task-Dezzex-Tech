/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         clientName:
 *           type: string
 *         duration:
 *           type: string
 *         dateTime:
 *           type: string
 *           format: date-time
 *         bookedOn:
 *           type: string
 *           format: date-time
 *         lawyer_id:
 *           type: integer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         image:
 *           type: string
 *         name:
 *           type: string
 *         law_type:
 *           type: string
 *         title:
 *           type: string
 *         brief:
 *           type: string
 *         createdOn:
 *           type: string
 *           format: date-time
 *         isPosted:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         caseTitle:
 *           type: string
 *         caseNumber:
 *           type: string
 *         caseType:
 *           type: string
 *         jurisdiction:
 *           type: string
 *         priority:
 *           type: string
 *         fillingDate:
 *           type: string
 *           format: date
 *         caseDescription:
 *           type: string
 *         clientId:
 *           type: integer
 *         clientName:
 *           type: string
 *         clientCompany:
 *           type: string
 *         clientEmail:
 *           type: string
 *         clientPhone:
 *           type: string
 *         clientAddress:
 *           type: string
 *         opposingParty:
 *           type: string
 *         opposingCounsel:
 *           type: string
 *         estimatedCaseValue:
 *           type: number
 *           format: float
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseLawyer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         caseId:
 *           type: integer
 *         lawyerId:
 *           type: integer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseComment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         caseId:
 *           type: integer
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseNote:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         caseId:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseFile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         caseId:
 *           type: integer
 *         filename:
 *           type: string
 *         fileUrl:
 *           type: string
 *         uploadedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         clientType:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         altPhoneNumber:
 *           type: string
 *         website:
 *           type: string
 *         streetAddress:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         zipCode:
 *           type: string
 *         country:
 *           type: string
 *         assignedLawyer:
 *           type: integer
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 *         billed:
 *           type: boolean
 *         notes:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Lawyer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         mobile:
 *           type: string
 *         email:
 *           type: string
 *         country:
 *           type: string
 *         yearsOfExperience:
 *           type: integer
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         lawyerType:
 *           type: string
 *         about:
 *           type: string
 *         practiceAreas:
 *           type: array
 *           items:
 *             type: string
 *         consultantAvailability:
 *           type: object
 *         timing:
 *           type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */