# Boilerplate

## project-name

### Idea
#### Problem
* You have 5 minutes to spare (waiting for a bus, waiting for a build) and think "I'll just scroll for a minute"
* Half an hour later you are still there
* Opening the app happens on autopilot, before you have decided anything
* Usage statistics only show the damage afterwards
* Existing tools set the rules in advance (daily budgets, fixed limits, open counters), so people feel punished and switch them off
#### Solution
* Every time you open a selected app, a pop-up asks: "How long do you want to spend here?"
* You pick a duration, for example 5 minutes today and 20 minutes tomorrow
* It changes every time, because you decide fresh in the moment
* When the time is up, project-name tells you it's time to stop
* project-name only holds you to the promise you just made
* You choose what happens at the end (a setting)
    * Reask: project-name asks "How long now?", so you have to make a new decision
    * Hard block: the app is off-limits for a cooldown period
* You choose how the cooldown is calculated (a setting)
    * Fixed: always the same time, e.g. 30 minutes
    * Multiplier: time spent × a factor (×1 means equal time off as time on)
    * Capped scaling: grows quickly but never passes a maximum
* Optional extras
    * Scroll-wheel timer and preset buttons, each toggleable
    * Playful companion that reacts to whether you kept your promise (a plant that wilts, a buddy that needs rest)
#### Design principles (what project-name deliberately does not do)
* No breathing exercise or waiting pause before opening an app
* No daily time budget
* No limit on the number of openings per day
* No fixed limit decided in advance
* No limit on the number of apps, and no premium tier
#### Target audience
* Students and young adults who open social apps out of habit
* People who want to use apps with purpose, not be locked out of them
#### Competitors
* one sec: tried it myself; makes you breathe before opening the app, but you do not choose a duration each time
* ScreenZen: tried it myself; time limits are configured in advance, not asked each time you open the app
* Difference: project-name asks "how long?" every time and lets you decide the consequence (reask or hard block)
### PWA (assignment 1, due 4 November)
#### Goal
* Prove the core flow in a browser, installable on a phone
#### Scope
* Mocked login
* Tracked-apps screen
* Prompt screen with duration picker (presets + toggleable scroll wheel)
* Time's-up screen
* Installable (web app manifest and icons)
#### How it is triggered
* A PWA cannot see which app is open
* The user sets up an automation on their phone that opens a project-name link when a chosen app launches
    * iOS: Shortcuts personal automation
    * Android: Samsung Routines, MacroDroid or Tasker
* The link opens the prompt screen for that app
#### Limitations (known and documented)
* "Time spent" is the promised time, because the real time in the app cannot be measured
* A hard block is a soft lockout: the cooldown screen is shown, but the real app can still be opened
* Notifications only work while project-name is open
* Data is stored locally on the device
#### Planned after the first version
* Reask and hard-block settings with the cooldown types
* Local persistence of settings, sessions and cooldowns
* Supabase login and sync
### Native (assignment 2, due 31 December)
#### Goal
* The full idea as described, with nothing simulated
#### Android (main target)
* Detects the moment a tracked app opens, with no automation setup
* Pop-up appears on top of the app that was opened
* Measures the real time spent in the app
* Hard block really stops the app from being used during the cooldown
* Persistent notification with the time left
* Permissions onboarding (usage access, display over other apps, notifications, battery settings)
* Same prompt, countdown and settings screens as the PWA
#### iOS
* Same app, with the Shortcuts automation as the trigger
* Documented but untested, because no iPhone or Apple developer account is available
#### Approach
* Same codebase, built as an Expo development build
* Native Android part added as a module

## Dev Guidelines
### Keep the Folder Structure
- Do not change folder
- You’re free to add folders
- Folders not in use, just keep them

### UI
- UI can be extended, but you must use base components

### Everything is Typed
- No null
- No AS assumptions (unless commented)
- No ‘never’

### Separate your API Calls
- No Api calls in components
- All-in services folder

## Line Endings
This repository uses LF (`\n`) line endings. `.gitattributes` enforces them
automatically (`* text=auto eol=lf`), so whatever your editor or OS defaults to,
Git records only your real changes instead of showing whole files as modified.

If every line of a file suddenly shows up as changed, something is writing CRLF
into it. Set your editor to insert LF — VS Code: `"files.eol": "\n"`.
