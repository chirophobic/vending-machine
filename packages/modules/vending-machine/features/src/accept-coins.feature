Feature: Accept Coins

    Scenario Outline: Accept Valid Coins
        Given I have inserted no coins
        When I insert a "<coin>" coin
        Then the amount inserted should display "<amount>"

        Examples:
            | coin | amount |
            | 20c  | $0.20  |
            | $1   | $1.00  |
