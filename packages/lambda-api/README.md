# API Documentation

## Introduction

This document outlines the specification for the various data structures that are used by the C# lambda backend to generate deals and bidding sequences. Reference this document to understand the structure of the payloads that need to be sent when using the js API.

## Using the JS API

Several API calls can be made through functions defined in the src/bsapi.js file. The following functions are defined:

### **1. get_random_deals(count)**
Fetches a specified number of random bridge deals.

- **Parameters:**
  - `count` (number): The number of random deals to fetch.

- **Returns:**
  - A promise that resolves to a JSON response containing a list of [Deal](#deal) objects.

- **Usage:**
  ```javascript
  get_random_deals(5).then(response => {
      console.log(response);  // Array of Deal objects
  });
  ```

### **2. get_deals(payload, verbose = false)**
Retrieve bridge deals based on a specified payload and verbosity level.

- **Parameters:**
  - `payload` (object): A [DealRequest](#dealrequest) object containing the details to fetch the deals.
  - `verbose` (boolean): (optional, default = false) Set to true to get detailed information.

- **Returns:**
  - A promise that resolves to a JSON response containing a list of [Deal](#deal) objects.

- **Usage:**
  ```javascript
  get_deals({ /* DealRequest object */ }, true).then(response => {
      console.log(response);  // Array of Deal objects
  });
  ```

### **5. get_next_bid(payload, system)**
Retrieves the next bid in a bridge game based on the specified system and payload.

- **Parameters:**
  - `payload` (object): A [BiddingRequest](#biddingrequest) object containing details to get the next bid.
  - `system` (string): The system to be used for bidding.

- **Returns:**
  - A promise that resolves to a JSON response containing a `BidDescription` object.

- **BidDescription Object (C# representation):**
  ```csharp
  public record BidDescription(Bid Bid, string Description = "");
  ```

- **Usage:**
  ```javascript
  get_next_bid({ /* BiddingRequest object */ }, 'systemName').then(response => {
      console.log(response);  // BidDescription object
  });
  ```

### **6. get_sequence(sequence, system)**
Gets a specific bidding sequence in a bridge game.

- **Parameters:**
  - `sequence` (string): The bidding sequence.
  - `system` (string): The system to be used for bidding.

- **Returns:**
  - A promise that resolves to a JSON response containing a [BiddingResponse](#biddingresponse) object.

- **Usage:**
  ```javascript
  get_sequence('sequenceString', 'systemName').then(response => {
      console.log(response);  // BiddingResponse object
  });
  ```

For a detailed understanding, please refer to the definitions of [Deal](#deal), [DealRequest](#dealrequest), [BiddingRequest](#biddingrequest), `BidDescription`, and [BiddingResponse](#biddingresponse) objects which are defined elsewhere in your documentation. It is essential to maintain consistency in object structures while interacting with the API.


## Basic Data Structures

The most basic data structures used by the backend are:
- [Holding](#holding)
- [Bid](#bid)
- [Direction](#direction)
- [Suit](#suit)
- [Tempo](#tempo)

### Holding

```csharp
[Flags]
public enum Holding
{
    C = 1 << 0,
    /* ... Other individual cards in the order 2->Ace, Clubs->Diamonds->Hearts->Spades,
    left out to perserve space in the readme file */
    SA = 1UL << 51,
    Clubs = (CA << 1) - C2,
    Diamonds = (DA << 1) - D2,
    Hearts = (HA << 1) - H2,
    Spades = (SA << 1) - S2,
    All = Spades | Hearts | Diamonds | Clubs, 
    ClubHonors = CJ | CQ | CK | CA,
    DiamondHonors = DJ | DQ | DK | DA,
    HeartHonors = HJ | HQ | HK | HA,
    SpadeHonors = SJ | SQ | SK | SA,
    Honors = ClubHonors | DiamondHonors | HeartHonors | SpadeHonors,
    Aces = SA | HA | DA | CA,
    Kings = SK | HK | DK | CK,
    Queens = SQ | HQ | DQ | CQ,
    Jacks = SJ | HJ | DJ | CJ
}
```

#### Description

The [Holding](#holding) enum is designed to represent a collection of cards in a bridge game using a single `ulong` value, where each bit in the `ulong` represents whether a specific card is held. This allows for efficient representation and manipulation of card sets.

#### Values

The [Holding](#holding) enum defines the following values:

- Individual card values (e.g., `C2`, `D3`, `HA`, `S4`), representing each card in a deck. Here, the prefixes `C`, `D`, `H`, and `S` denote the suits clubs, diamonds, hearts, and spades, respectively, followed by the card rank.
- Suit groups (e.g., `Clubs`, `Diamonds`, `Hearts`, `Spades`), representing all cards of a specific suit.
- Honor groups (e.g., `ClubHonors`, `DiamondHonors`, `HeartHonors`, `SpadeHonors`, `Honors`), representing specific categories of high-value cards.
- Rank groups (e.g., `Aces`, `Kings`, `Queens`, `Jacks`), representing cards of a specific rank across all suits.
- `All`, representing all the cards.

#### JSON Representation

In JSON, a [Holding](#holding) enum value is preferably represented as a number corresponding to the `ulong` representation of the card(s). This ensures consistency and facilitates ease of use and conversions in different programming environments. For example, to represent the Ace of spades, the JSON representation would be:

```json
{
    "Holding": 4503599627370496
}
```

This numeric value is derived from the `ulong` representation of the `SA` value in the [Holding](#holding) enum.

---

### Direction
```csharp
[Flags]
public enum Direction : byte
{
    North = 1,
    East = 2,
    South = 4,
    West = 8,
    NS = North | South,
    EW = East | West,
    All = North | East | South | West
}
```

#### Description

The [Direction](#direction) enum is used to represent the four cardinal directions that are traditionally used in a bridge game to denote the positions of the players: North, East, South, and West. This enum leverages the `[Flags]` attribute, allowing for the representation of combinations of directions, which can be useful in different contexts in a bridge game, such as representing partnerships (North-South vs. East-West).

#### Values

The [Direction](#direction) enum defines the individual directions and their combinations as follows:

- **North (0b0001):** Representing the north position on the bridge table.
- **East (0b0010):** Representing the east position on the bridge table.
- **South (0b0100):** Representing the south position on the bridge table.
- **West (0b1000):** Representing the west position on the bridge table.
- **NS (North | South, 0b0101):** Representing the combination of north and south positions, usually to denote a partnership in the game.
- **EW (East | West, 0b1010):** Representing the combination of east and west positions, usually to denote a partnership in the game.

#### JSON Representation

In JSON, a [Direction](#direction) enum value is preferably represented as a number, corresponding to the underlying numeric value of the enum, ensuring consistency and ease of conversions. For example:

```json
{
    "Direction": 5
}
```

In this example, the direction represented is "NS", denoting a partnership between the north and south positions, and corresponds to the numeric value 5 in the [Direction](#direction) enum.

---

### Suit

```csharp
[Flags]
public enum Suit
{
    C = 1 << 0,
    D = 1 << 1,
    H = 1 << 2,
    S = 1 << 3,
    MAJOR = H | S,
    MINOR = C | D,
    RED = H | D,
    BLACK = S | C,
    ROUND = C | H,
    POINTED = D | S
}
```

#### Description

The [Suit](#suit) enum represents the four suits of a standard deck of playing cards used in a bridge game: clubs (C), diamonds (D), hearts (H), and spades (S). Besides individual suits, it also defines several combinations of suits to represent common categories in bridge, such as major, minor, red, black, round, and pointed suits. This enables more expressive and efficient representation and manipulation of suits in different contexts within a bridge game.

#### Values

The [Suit](#suit) enum defines the individual suits and their combinations, utilizing bitwise shifts to assign unique values to each. The values are as follows:

- **C (0b0001):** Representing the clubs suit, denoted as "C".
- **D (0b0010):** Representing the diamonds suit, denoted as "D".
- **H (0b0100):** Representing the hearts suit, denoted as "H".
- **S (0b1000):** Representing the spades suit, denoted as "S".
- **MAJOR (H | S):** Representing the major suits, a combination of hearts and spades.
- **MINOR (C | D):** Representing the minor suits, a combination of clubs and diamonds.
- **RED (H | D):** Representing the red suits, a combination of hearts and diamonds.
- **BLACK (S | C):** Representing the black suits, a combination of spades and clubs.
- **ROUND (C | H):** Representing the round suits, a combination of clubs and hearts.
- **POINTED (D | S):** Representing the pointed suits, a combination of diamonds and spades.

#### JSON Representation

In JSON, a [Suit](#suit) enum value is best represented as a number, corresponding to the underlying numeric value defined in the enum. This ensures a consistent representation that is easy to work with in different programming environments. For example:

```json
{
    "Suit": 12
}
```

In this example, the suit represented is "BLACK", a combination of the spades and clubs suits, which corresponds to the numeric value 12 in the [Suit](#suit) enum.

---

### Bid

```csharp
public enum Bid
{
    P, D, R, 
    C1, D1, H1, S1, N1,
    C2, D2, H2, S2, N2,
    C3, D3, H3, S3, N3,
    C4, D4, H4, S4, N4,
    C5, D5, H5, S5, N5,
    C6, D6, H6, S6, N6,
    C7, D7, H7, S7, N7,
}
```

#### Description

The [Bid](#bid) enum represents the different bids that can be made in a round of bridge. It encompasses not only the possible contract bids (ranging from 1 to 7 in each suit plus notrump) but also pass (`P`), double (`D`), and redouble (`R`). The enum assigns specific numeric values to each bid, facilitating easy representation and processing of bids in various programming environments.

#### Values

The [Bid](#bid) enum defines each bid available in a bridge game, as follows:

- **Pass (P):** Representing a decision to not increase the current bid. It has a numeric value of 0.
- **Double (D):** Used to double the stakes of the current bid. It has a numeric value of 1.
- **Redouble (R):** Used to redouble the stakes after a double. It has a numeric value of 2.
- **Contract bids:** Representing the different levels (1-7) and denominations (clubs, diamonds, hearts, spades, no trump) a player can bid to try and win. They are represented with a combination of the level and the first letter of the denomination or "N" for no trump (e.g., `C1`, `D3`, `H2`, `S4`, `N5`). These bids have numeric values ranging from 3 to 37, following the natural order.

#### JSON Representation

In JSON, a [Bid](#bid) enum value is preferably represented as a number, the underlying numeric value of the enum, to ensure consistency and ease of use in different programming environments. For example:

```json
{
    "Bid": 2
}
```

In this example, the bid represented is "Redouble" which corresponds to the numeric value 2 in the [Bid](#bid) enum.


### Tempo

```csharp
public enum Tempo
{
    NF, F1, GF, SF
}
```

#### Description

The [Tempo](#tempo) enum represents the forcing tempo of a bidding sequence.

#### Values

The [Tempo](#tempo) enum defines the various forcing tempos, as follows:

- **Not Forcing (NF):** Representing a sequence which is not forcing, that can be passed.
- **Forcing One Round (F1):** Representing a sequence that is forcing one round, that the player may not pass for one round.
- **Game Forcing (GF):** Representing a game forcing sequence that the player may only pass if the auction is at game level.
- **Slam Forcing (SF):** Representing a slam forcing sequence that the player may only pass if the auction is at slam level.

#### JSON Representation

In JSON, a [Tempo](#tempo) enum value is preferably represented as a number, the underlying numeric value of the enum, to ensure consistency and ease of use in different programming environments. For example:

```json
{
    "Tempo": 0
}
```

In this example, the tempo represented is "NF" which corresponds to the numeric value 0 in the [Tempo](#tempo) enum.

## Paylaod and Response Data Structures

The payload and response data structures are:
- [Deal](#deal)
- [ReadableDeal](#readabledeal)
- [DealRequest](#dealrequest)
- [BiddingRequest](#biddingrequest)
- [BiddingResponse](#biddingresponse)
- [Predeal](#predeal)

### Deal

```csharp

public class Deal
{
    public int DealNumber { get; set; }
    public Holding North { get; set; }
    public Holding East { get; set; }
    public Holding South { get; set; }
    public Holding West { get; set; }
    public List<BidDescription> Bidding { get; set; } 
    public List<Holding> Play { get; set; } 
}
```

#### Description

The [Deal](#deal) class serves as a representation of a bridge deal. It contains information about the current deal, including the cards held by each player, the bidding sequence, and the play sequence.

#### Properties

- **`DealNumber (int)`**
  - **Description:** Represents the number associated with the deal. It is initialized to 1 by default.
  - **JSON Representation:** As a number.
  - **Example:**
    ```json
    {
        "DealNumber": 1
    }
    ```

- **`North (Holding)`**
  - **Description:** Represents the cards held by the player in the North direction.
  - **JSON Representation:** As a number, representing the ulong value of the [Holding](#holding) enum.
  - **Example:**
    ```json
    {
        "North": 4503599627370496
    }
    ```

- **`East (Holding)`**
  - **Description:** Represents the cards held by the player in the East direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "East": 4503599627370496
    }
    ```

- **`South (Holding)`**
  - **Description:** Represents the cards held by the player in the South direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "South": 4503599627370496
    }
    ```

- **`West (Holding)`**
  - **Description:** Represents the cards held by the player in the West direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "West": 4503599627370496
    }
    ```

- **`Bidding (List<BidDescription>)`**
  - **Description:** Represents the list of bids made during the bidding phase of the deal. It is initialized to an empty list by default.
  - **JSON Representation:** As an array of numeric values, representing the underlying numeric values of the `BidDescription` objects.
  - **Example:**
    ```json
    {
        "Bidding": [/* array of BidDescription objects */]
    }
    ```

- **`Play (List<Holding>)`**
  - **Description:** Represents the list of plays made during the play phase of the deal. It is initialized to an empty list by default.
  - **JSON Representation:** As an array of numeric values, representing the ulong values of the [Holding](#holding) enum.
  - **Example:**
    ```json
    {
        "Play": [4503599627370496, 2251799813685248]
    }
    ```

### ReadableDeal

```csharp
public class ReadableDeal
{
    public string? North { get; set; }
    public string? East { get; set; }
    public string? South { get; set; }
    public string? West { get; set; }
    public string? Bidding { get; set; }
    public string? Play { get; set; }
}
```

#### Description

The [ReadableDeal](#readabledeal) class serves as a representation of a bridge deal in a format that is easy to read and understand. It contains string representations of the holdings of each player, the bidding sequence, and the play sequence, making it suitable for displaying deal information in a user-friendly manner.

#### Properties

- **`North (string?)`**
  - **Description:** Represents the cards held by the player in the North direction, in a readable string format. The format is as follows: `[S].[H].[D].[C]`, where each suit contains a concatenated string of its ranks. It can be null.
  - **JSON Representation:** As a string or `null`.
  - **Example:**
    ```json
    {
        "North": "AKQJ.T98.765.432"
    }
    ```

- **`East (string?)`**
  - **Description:** Represents the cards held by the player in the East direction, similar to the North property but representing the East player's hand.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "East": "432.AKQJ.T98.765"
    }
    ```

- **`South (string?)`**
  - **Description:** Represents the cards held by the player in the South direction, similar to the North property but representing the South player's hand.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "South": "T98.765.432.AKQJ"
    }
    ```

- **`West (string?)`**
  - **Description:** Represents the cards held by the player in the West direction, similar to the North property but representing the West player's hand.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "West": "765.432.AKQJ.T98"
    }
    ```

- **`Bidding (string?)`**
  - **Description:** Represents the bidding sequence in the deal, where each bid is represented as a readable string. The individual bid strings are concatenated into a single string representing the entire bidding sequence. It can be null. The bid strings are consistent with the names defined in the [Bid](#bid) enum.
  - **JSON Representation:** As a string or `null`.
  - **Example:**
    ```json
    {
        "Bidding": "S1-N1-H2-P"
    }
    ```

- **`Play (string?)`**
  - **Description:** Represents the play sequence in the deal, in a readable string format. The card strings are consistent with the names defined in the [Holding](#holding) enum. It can be null.
  - **JSON Representation:** As a string or `null`.
  - **Example:**
    ```json
    {
        "Play": "SA-HK-DQ-CJ"
    }
    ```

---

### DealRequest

```csharp
public class DealRequest
{
    public int Generate { get; set; }
    public int Produce { get; set; }
    public Predeal Predeal { get; set; } 
    public Dictionary<Direction, string> Constraints { get; set; }
}
```

#### Description

The [DealRequest](#dealrequest) class is used to initiate a request for generating bridge deals. It provides various parameters that control the generation process, including the number of deals to generate and produce, pre-deal configurations, and constraints based on player directions.

#### Properties

- **`Generate (int)`**
  - **Description:** The number of deals to generate in the request. It is initialized to 1 by default.
  - **JSON Representation:** As a number.
  - **Example:**
    ```json
    {
        "Generate": 5
    }
    ```

- **`Produce (int)`**
  - **Description:** The number of deals to produce from the generated deals. It is initialized to 1 by default.
  - **JSON Representation:** As a number.
  - **Example:**
    ```json
    {
        "Produce": 3
    }
    ```

- **`Predeal (Predeal)`**
  - **Description:** An instance of the [Predeal](#predeal) class to set up initial conditions for a bridge deal, allowing specific holdings for each player before the deal is generated. It is initialized to a new [Predeal](#predeal) instance by default.
  - **JSON Representation:** As an object representing the [Predeal](#predeal) class, where each property of [Predeal](#predeal) is represented according to its respective JSON representation as described in the [Predeal](#predeal) section.
  - **Example:**
    ```json
    {
        "Predeal": {
            "North": 4503599627370496,
            "East": 2251799813685248,
            "South": 1125899906842624,
            "West": 562949953421312
        }
    }
    ```

- **`Constraints (Dictionary<Direction, string>)`**
  - **Description:** A dictionary that defines constraints for the deal based on player directions. The keys are [Direction](#direction) enum values representing player directions and the values are strings specifying the constraints for the respective directions.
  - **JSON Representation:** As an object where keys are numeric representations of [Direction](#direction) enum values and values are strings specifying the constraints.
  - **Example:**
    ```json
    {
        "Constraints": {
            "1": "5+ hearts",
            "2": "2- spades",
            "4": "15-17 bal",
            "8": "shape 4-4-3-2"
        }
    }
    ```

#### Note

In the `Constraints` property JSON representation example, the numbers "1", "2", "4", and "8" are the numeric representations of the [Direction](#direction) enum values "North", "East", "South", and "West", respectively. It's important to use the correct numeric values to represent the desired directions accurately.

---

### Predeal

```csharp
public class Predeal
{
    public Holding North { get; set; }
    public Holding East { get; set; }
    public Holding South { get; set; }
    public Holding West { get; set; }
}
```

#### Description

The [Predeal](#predeal) class is utilized to set up initial conditions for a bridge deal. It allows you to define specific holdings (sets of cards) for each player before the deal is generated. 

#### Properties

- **`North (Holding)`**
  - **Description:** Represents the cards predetermined for the player in the North direction.
  - **JSON Representation:** As a number, representing the ulong value of the [Holding](#holding) enum.
  - **Example:**
    ```json
    {
        "North": 4503599627370496
    }
    ```

- **`East (Holding)`**
  - **Description:** Represents the cards predetermined for the player in the East direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "East": 4503599627370496
    }
    ```

- **`South (Holding)`**
  - **Description:** Represents the cards predetermined for the player in the South direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "South": 4503599627370496
    }
    ```

- **`West (Holding)`**
  - **Description:** Represents the cards predetermined for the player in the West direction.
  - **JSON Representation:** Similar to the North property.
  - **Example:**
    ```json
    {
        "West": 4503599627370496
    }
    ```

---

### BiddingRequest

```csharp
public class BiddingRequest
{
    public Holding Holding { get; set; }
    public List<Bid> Bidding { get; set; } = new();
}
```

#### Description

The [BiddingRequest](#biddingrequest) class encapsulates the information needed to request a bid during a bridge game. It contains the current holding of the player making the request, as well as the bidding sequence up to the current point.

#### Properties

- **`Holding (Holding)`**
  - **Description:** Represents the current set of cards held by the player making the bid request.
  - **JSON Representation:** As a number, representing the ulong value of the [Holding](#holding) enum.
  - **Example:**
    ```json
    {
        "Holding": 4503599627370496
    }
    ```

- **`Bidding (List<Bid>)`**
  - **Description:** Represents the list of bids that have been made in the current game up to the point of the request.
  - **JSON Representation:** As an array of numbers, each representing the numeric value of a [Bid](#bid) enum entry.
  - **Example:**
    ```json
    {
        "Bidding": [0, 3, 1, 4]
    }
    ```

---

### BiddingResponse

```csharp
public class BiddingResponse
{
    public List<Bid> Sequence { get; set; } 
    public string Constraint { get; set; } 
    public string Description { get; set; }
    public Tempo Tempo { get; set; }
}
```

#### Description

The [BiddingResponse](#biddingresponse) class defines the structure for the response to a bidding sequence request. It contains the full bidding sequence, along with a constraint, a textual description, and the tempo of the sequence.

#### Properties

- **`Sequence (List<Bid>)`**
  - **Description:** The full sequence of bids.
  - **JSON Representation:** As an array of numbers, each representing the numeric value of a [Bid](#bid) enum entry.
  - **Example:**
    ```json
    {
        "Sequence": [0, 0, 3, 4, 5]
    }
    ```

- **`Constraint (string)`**
  - **Description:** A string describing the constraint of the last bid of the sequence.
  - **JSON Representation:** As a string.
  - **Example:**
    ```json
    {
        "Constraint": "15-17 bal"
    }
    ```

- **`Description (string)`**
  - **Description:** A textual description explaining the rationale behind the suggested bid.
  - **JSON Representation:** As a string.
  - **Example:**
    ```json
    {
        "Description": "15 to 17 hcp and a balanced hand"
    }
    ```

- **`Tempo (Tempo)`**
  - **Description:** Indicates the forcing tempo of the recommended bid in the bidding sequence.
  - **JSON Representation:** As a number, representing the numeric value of the [Tempo](#tempo) enum entry.
  - **Example:**
    ```json
    {
        "Tempo": 0
    }
    ```

## Syntax Guide for Constructing Constraint Input Strings

When setting up constraints for your bridge deal or holding, you can define a variety of conditions using a specific syntax in the input string. This guide will help you understand how to construct this input string to define your constraints precisely.

### Basic Syntax Rules

1. **Attribute Keywords:**
   - **HCP:** Use "hcp" to define high card point constraints.
   - **Suits:** Use "spades", "hearts", "diamonds", or "clubs" to define constraints based on specific suits.
   - **Balance:** Use "bal" to specify a balanced holding and "unbal" for unbalanced.

2. **Operators:**
   - **Exact Value:** Use a number followed by a space and then the attribute keyword (e.g., "13 hcp").
   - **Minimum Value:** Use a number followed by a plus sign and a space, then the attribute keyword (e.g., "13+ hcp").
   - **Maximum Value:** Use a number followed by a minus sign and a space, then the attribute keyword (e.g., "16- hcp").
   - **Range:** Define a range using two numbers separated by a hyphen, followed by a space and then the attribute keyword (e.g., "12-15 hcp").

3. **Special Constraints:**
   - **Shape:** Use the keyword "shape" followed by four numbers separated by hyphens to define the exact number of cards in each suit (e.g., "shape 4-4-3-2").
   - **Long:** Use the keyword "long" followed by a suit to specify that the suit should be the longest or equal to the longest in the holding (e.g., "long spades").
   - **Longest:** Use the keyword "longest" followed by a suit to specify that the suit should be the longest in the holding (e.g., "longest hearts").

### Combining Constraints

To build a more complex constraint structure, you can combine multiple constraints using the following rules:

**Whitespace:** 

In the input string, whitespace can be utilized to delineate separate constraints that function conjunctively, meaning all such constraints must be satisfied for the validation to pass. Essentially, it operates under a logical "AND" principle, where each condition specified must hold true. For instance, the string `"12+ hcp 5+ spades bal"` requires a holding to have 12 or more high card points, at least 5 spades, and to be balanced. This feature facilitates the definition of precise and strict criteria by chaining multiple conditions seamlessly, without the need for additional keywords.

2. **OR Logic:** 

Use the "or" keyword to create a batch of constraints where meeting any one of the conditions is sufficient for the batch to be satisfied. For instance, in the string `"shape 4-4-3-2 or 13+ hcp"`, the batch is satisfied if either the shape matches `4-4-3-2` or the high card points (hcp) are `13` or more. This establishes a kind of "any" logic within a batch, allowing for a flexible set of criteria where any single condition being true validates the batch. It's a handy tool to define a batch with diverse criteria where satisfying just one condition is sufficient.

3. **AND Logic:** 

The "and" keyword is used to segregate different batches of constraints, each of which may contain one or more conditions separated by "or." In this scenario, each batch operates on an "any" logic, meaning any one of the conditions in the batch must be true. The "and" keyword then enforces an "all" logic across these batches, meaning all batches must hold true for the overall condition to be satisfied. Essentially, it allows you to say "this or this must be true, and also, this or this must be true." For instance, in the input string "shape 4-4-3-2 or 13+ hcp and long spades or longest diamonds", the set is valid if either the shape is 4-4-3-2 or the holding has 13+ hcp, and either spades are the longest or equal longest suit or diamonds are the longest suit.

### Examples

Here are a few examples to illustrate how you can construct constraint input strings with various logic combinations:

- **Single Constraint:** "13 hcp" — A straightforward constraint that requires exactly 13 high card points.
  
- **Multiple Constraints using Whitespace:** "13+ hcp 5+ spades bal" — This string defines a multi-faceted constraint where all conditions must be satisfied; the hand must have over 13 high card points, more than 5 spades, and be balanced.
  
- **Multiple Constraints with OR Logic:** "shape 4-4-3-2 or 13+ hcp" — Here, a hand can satisfy the constraint by either adhering to the specified shape or having more than 13 high card points, offering a more lenient constraint with two possible fulfilling conditions.

- **Complex Constraints with Mixed Logic:** "shape 4-4-3-2 or 13+ hcp and long spades or longest diamonds" — In this complex string, a hand must satisfy a series of conditions where the "and" keyword demands both surrounding constraints to be satisfied, while "or" allows for alternative satisfying conditions, creating a rich and nuanced constraint with multiple paths to validation.

### Notes

1. The "bal" and "unbal" keywords can also be used with min, max, and range constraints, defaulting to hcp if used in this context (e.g., "15-17 bal").
   
2. You can create detailed and complex constraints by skillfully combining "and" & "or" keywords to define various batches and constraints.

### Tips

- Always follow the number with a space before specifying the attribute keyword.
- Use whitespace to separate different constraints clearly.
- Maintain the specified formats for various constraints to ensure accurate constraint definition and validation.

