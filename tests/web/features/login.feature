Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I login with valid credentials
    Then I should see the successful login page
