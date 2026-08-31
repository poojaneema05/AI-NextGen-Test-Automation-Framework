/**
 * Represents the credentials required to authenticate a user.
 */
export interface LoginCredentials {

    username: string;

    password: string;
}


/**
 * Test data used by login-related tests.
 *
 * Keeping test data separate from test logic makes tests
 * easier to read, maintain, and extend.
 */
export const loginData = {

    validUser: {
        username: "student",
        password: "Password123"
    } satisfies LoginCredentials,

    invalidUser: {
    username: "student",
    password: "WrongPassword123"
    } satisfies LoginCredentials
};