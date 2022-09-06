@manual 
Scenario Outline: Pressing operators screen buttons - Hightlighting
When the user presses the "<button1>" button
Then the "<button1>" button should be highlighted
And the "<button2>" button should be unhighlighted
And the "<button3>" button should be unhighlighted
And the "<button4>" button should be unhighlighted

Examples:
| button1 | button2 | button3 | button4 |
|       + |       - |       * |       / |
|       - |       + |       / |       * |
|       / |       * |       + |       - |
|       * |       / |       - |       + |

@manual
Scenario Outline: Pressing operators screen keys - Hightlighting
When the user presses the "<key>" key
Then the "<button1>" button should be highlighted
And the "<button2>" button should be unhighlighted
And the "<button3>" button should be unhighlighted
And the "<button4>" button should be unhighlighted

Examples:
| key | button1 | button2 | button3 | button4 |
|   + |       + |       - |       * |       / |
|   - |       - |       + |       / |       * |
|   / |       / |       * |       + |       - |
|   * |       * |       / |       - |       + |

@manual
Scenario Outline: Unhighlighting operators screen buttons using the mouse
Given the "<button1>" button is highlighted
When the user presses the "<button2>" button
Then the "<button1>" button should be unhighlighted

Examples:
| button1 | button2 |
|       + |      =  |
|       + |      C  |
|       - |      =  |
|       - |      C  |
|       * |      =  |
|       * |      C  |
|       / |      =  |
|       / |      C  |

@manual
Scenario Outline: Unhighlighting operators screen buttons using the keyboard
Given the "<button>" button is highlighted
When the user presses the "<key>" key
Then the "<button>" button should be unhighlighted

Examples:
| button |    key |
|      + | Escape | 
|      + |      = |
|      - | Escape |
|      - |      = |
|      * | Escape |
|      * |      = |
|      / | Escape |
|      / |      = |

@manual
Scenario: Button Disabled -> Do it on Figma
Given the display shows the following value: "-123456789,5"
When the user hovers the mouse over a numerical button
Then the cursor shouldn't change to a clicking cursor
