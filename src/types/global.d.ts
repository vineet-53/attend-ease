export {};

// Create a type for the roles
export type Roles = "ADMIN" | "STUDENT" | "FACULTY";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
