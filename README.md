<p align="center">
  <img width="300" height="500" src="https://raw.githubusercontent.com/rafaelmaiach/flashcards-omaia/master/readme-images/flashcards-omaia.png">
</p>

# Flashcards OMaia
The **Flashcards Project** is the third and last project from the **Udacity's React Developer Nanodegree** program. We build a flashcards mobile app to allow users to study questions and terms for example. The app will allow users to create, delete and edit decks of cards and study them using a quiz game. At the end of the game, you will be able to see your result for that deck. All of this created with **REACT NATIVE**.

## Table of contents
- [Flashcards OMaia](#flashcards-omaia)
  - [Table of contents](#table-of-contents)
  - [How to install](#how-to-install)
  - [How to run](#how-to-run)
  - [How it works](#how-it-works)
    - [Home Screen](#home-screen)
    - [Trash Screen](#trash-screen)
    - [New Deck Screen](#new-deck-screen)
    - [Deck View Screen](#deck-view-screen)
    - [Quiz View Screen](#quiz-view-screen)
  - [Features](#features)
  - [Built with](#built-with)
  - [Contact me](#contact-me)
 

## How to install
To clone and run this application, you'll need [Git](https://git-scm.com/), a device with [Expo](https://expo.io/) installed or a device simulator installed on your computer like [XCode](https://developer.apple.com/xcode/) for iOS or [Android Studio](https://developer.android.com/studio/) for Android. After installation, clone and install the project dependencies:

```bash
# Clone this repository with https
$ git clone https://github.com/rafaelmaiach/flashcards-omaia.git

# OR clone with SSH
$ git clone git@github.com:rafaelmaiach/flashcards-omaia.git

# Go into the repository and install the application dependencies
$ cd flashcards-omaia
$ npm install
```
[(Back to top)](#table-of-contents)

## How to run
As the project is built using Expo, you can run in both iOS and Android, just need to have the desired simulator/device and all dependencies installed. 

At the Expo interface, you can select which simulator you want to run the project or scan the given QR Code in Expo's installed on your device. 

To open the Expo interface:

```bash
# Go to project root
# Run npm script to start expo interface
npm start
```

[(Back to top)](#table-of-contents)

## How it works
The initial screens are: Home, New Deck and Trash which are navigated through buttons on footer of each one.

### Home Screen
This is the first screen. It shows all the decks created and each deck has three actions:
- **Access deck view**: just need to click on the deck to access the [Deck View Screen](#deck-view-screen)
- **Delete deck** and **edit deck**: both actions are hidden on a swipe component, so you need to swipe the deck to the left to show the two buttons (the pencil for edit and the trash can for delete). When you delete a deck, it disappears from the Home Screen but can still be found on [Trash Screen](#trash-screen) to be restored. When you edit, it changes to the [Edit Screen](#new-deck-screen).

### Trash Screen
At this screen you will see a list of deleted decks. These decks can all be permanently deleted by clicking on a **Clear** button on the top of screen or a particular deck can be restored by swipping the deck to the left and clicking on the **restore button**.

### New Deck Screen
At this screen you can create a new deck or edit an existing one. The functionalities of this screen are:
- **Change deck color and title**: Using the right menu on the screen header you can change the deck color using a pre-defined color palette and change the deck's title.
- **Add card**: Using the bottom button "Add Card" you can create new cards for the deck.
- **Edit card**: Using the footer of an individual card you can delete it from the deck, change its text color and its background color and change the view from front to back, to see the question (front card text) and the answer (back card text). To change the card text, just click on the card text to open a modal and change it.
- **Save Deck**: After all changes made, clicking on the button at the bottom of screen, you save the changes of a editted deck or to create a new one.

### Deck View Screen
This screen shows the informations about a deck and allows the user to study it with a quiz game.
- **Start Quiz**: Clicking on the "Start Quiz" button the user goes to [Quiz View Screen](#quiz-view-screen) where it will have a quiz game to study the cards of this deck.
- **Cards quantity**: You can see how many cards there are in this deck.
- **Add Card**: In this screen is possible to add a new card with some default configurations by clicking on the "Add Card" button.
- **Cards List**: All cards will be listed and each of them will show its question (left) and answer (right).
- **Play sound**: Each card has a play button that will play an audio which reads the Question and Answer texts. **At this version the speech works with english text, so other languages may have a bad experience on the audio**.

### Quiz View Screen
This screen shows a quiz game to allow users to study the cards of the deck. The game will show one card at time and a tracking of how many cards were studied and how many are left. 

The user will read the question of a card, if the user knows the answer it can click on the **check green button** to mark that card as correct. If it doesn't know, it can see the answer by clicking on the **answer button** and mark the card as incorrect using the **cross red button**.

When the last card is played, a result screen will be shown with the game result. At this screen user will see how many cards were correct and how many were incorrect, also each card will be marked with correct or incorrect to the user be able to see which one it knew and which one it didn't know.

Two buttons are present on this screen too. A **Restart Quiz** button that will start a new quiz with the same deck or **Back to Deck** button that sends the user to the [Deck View Screen](#deck-view-screen).

[(Back to top)](#table-of-contents)

## Features
As the project has a lot of potencial to grow in features, I decided to add some new features beyond the default that are required by the project specification.
- **Trash system**: When a deck is deleted, it is sent to  [Trash](#trash-screen) and there it can be restored or permanently deleted;
- **Deck and card edition**: The decks and cards can have their informations editted. The deck can have its background color and title changed as well as a card can be added or removed from it. The cards can have their texts (question and answer) changed as well as its background color and text color;
- **Play sound**: On the [Deck View](#deck-view-screen) the user can play an audio which will read the question and the answer for the specific card;

[(Back to top)](#table-of-contents)

## Built with
Bellow I'll list some of packages I used to built the app, you can check a full list of them on the **package.json** file.
- [Expo](https://expo.io/) - Free and open source toolchain built around React Native to help you build native iOS and Android projects using JavaScript and React;
- [React Navigation](https://reactnavigation.org/) - Routing and navigation for your React Native apps;
- [React Redux](https://github.com/reduxjs/react-redux) - Official React bindings for Redux;
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps;
- [Redux Persist](https://github.com/rt2zz/redux-persist) - Persist and rehydrate a redux store to allow your app to work offline.

[(Back to top)](#table-of-contents)

## Contact me
- [LinkedIn](https://www.linkedin.com/in/rafaelmaiach)

[(Back to top)](#table-of-contents)
