# KiT - Keep In Touch

KiT is a native-like mobile app that reminds users to keep in touch with the people they most want to stay connected with. Upon signing up, users can import contacts from their phone or add users manually, inputting phone, email, relationship type (family, social or professional), notes, and the frequency with which they would like to be reminded to contact that person. The user opens the app each day to see a randomly generated contact (based on the preferred frequency of contact), and can either use the displayed phone/email information to get in touch, or send the contact a text message right from the home screen.

KiT's back-end API was engineered with Node/Express, utilizes KnexJS to make data requests to a PostgreSQL database, and is deployed on Heroku. The front-end was built with AngularJS and is wrapped with Ionic to enable native app functionality. User passwords are encrypted using Bcrypt, and user authentication is implemented using JWT web tokens.

KiT's [Tin-Can Phone Logo](https://creativecommons.org/licenses/by/3.0/us/) is credited to Meg Clingman, and is licensed under CC 3.0.

##Examine, Play, Contribute
Feel free to fork and clone both the back-end and front-end repositories onto your local machine to see how KiT works or add additional features. Follow these instructions for local installation:

###Install npm dependencies

```bash
npm install
```

###Install cordova plugins and platforms

```bash
ionic state restore
```

###Update platform

```bash
cordova platform update ios
```

###Generate resources

```bash
ionic resources
```

##Android

###Install java
```bash
brew cask install java
```

###Install android sdk
```bash
brew install android-sdk
```

### Add android home to path and source path
```bash
echo "export ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
source ~/.bash_profile
```

###Install android build tools / platform tools & sdk
```bash
android
```

###Select latest build tools / platform tools and download android sdk 23 (v6)
```bash
ionic run android
```

- open chrome dev tools > options > more tools > inspect devices > inspect

- for emulation download system images, and intel HAXM to speed things up

- tap build number 5 or 7 or 9 or something times to enable dev tools

###Plugins
```bash
cordova plugin add cordova-sms-plugin
```

##ios
Currently to experience KiT on ios, you must be a registered Apple developer. Install the project in xcode and run a build on a test device.
###ios debugger

- safari > preferences > dev menu checkbox > develop on toolbar > simulator


###Navigate to front-end repository and follow installation instructions:
[https://github.com/cooper-db/kit-front-end](https://github.com/cooper-db/kit-front-end)
