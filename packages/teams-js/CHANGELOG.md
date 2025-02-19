# Change Log - @microsoft/teams-js

This log was last generated on Thu, 28 Apr 2022 18:25:41 GMT and should not be manually modified.

<!-- Start content -->

## 2.0.0-beta.6

Thu, 28 Apr 2022 18:25:41 GMT

### Major changes

- Updated `media` namespace to work as it did in v1 along with necessary changes to unit tests and teams-test-app
- Adding isSupported check to people capability
- Updated `meeting` namespace to work as it did in v1 along with necessary changes to unit tests and teams-test-app
- Updated `files` namespace to work as it did in v1 along with necessary changes to unit tests and teams-test-app
- Git magic week of 4/18/2022 
1. IMeetingDetails has been renamed to IMeetingDetailsResponse and IDetails has been replaced with IMeetingOrCallDetailsBase<T>. As such, meeting.getMeetingDetails() now takes in a callback which takes in IMeetingDetailsResponse rather than IMeetingDetails. 
2. pages.returnFocus() now works in any FrameContext rather than just with content. 
3. We have added the HostClientType `ipados`.
- Adding isSupported checks to all functions in the following capabilities:
    - appEntity
    - dialog
    - meetingRoom
    - monetization
    - teams
    - sharing (along with additional unit test case)
    - notifications (along with additional unit test cases)
    - video
    - remoteCamera
    - pages
    - menus
    - logs
    - legacy
    - teamsCore

### Minor changes

- Added `dialog.initialize` function.
    - `dialog.initialize` is called during app intialization.
    - Modified `registerOnMessageFromParent` in `DialogAPI.tsx` for the Teams Test App to account for this new functionality.

### Patches

- Updated `dialog.open` and `dialog.bot.open` to send `DialogInfo` type over to the host instead of `UrlDialogInfo` or `BotUrlDialogInfo` type
- Adding minRuntimeConfig to uninitialize for various capabilities
- Updated README.md to reflect branch rename
- In adaptive card based task modules, if the height is not provided in `taskInfo`, it wil not be set to a default small size. Instead the card content will be fit on a Task Module. 
- Removed `@deprecated` tags from meeting.ts and media.ts
- Removed @alpha tags as they are not supported in the SDK reference doc generation system

## 2.0.0-beta.5

Tue, 19 Apr 2022 16:08:56 GMT

### Major changes

- Removed PostMessageChannel return from dialog.open, added in separate function sendMessageToDialog to make up for missing functionality"
- Adding isSupported Check and unit test cases
- Change DeepLinkParameters not to use subEntity* anymore
- Adding isSupported work for chat and conversations
- Adding isSupport check for files module

### Minor changes

- Adding in `runtime.isLegacy` handler for the following deep link capabilities: `appInstallDialog`, `calendar`, `call`.
- Changed topic parameter name to `topicName` for `executeDeepLink` call in `chat.ts`

### Patches

- Moved conversations out of chat sub-capability and into their own top level capability in runtime.ts
- Add legacy capability support check

## 2.0.0-beta.4

Wed, 13 Apr 2022 21:40:51 GMT

### Major changes

- legacy.fullTrust.getUserJoinedTeams() has been moved into its own subcapability called joinedTeams and is now legacy.fullTrust.joinedTeams.getUserJoinedTeams().
- The type `PostMessageChannel` and `sendMessageToParentFromDialog` function in dialogs capability have been updated to not take callbacks in.
- Split chat capability into a private (conversation) and a public (chat) partition
- 1. Dialog capability has been split into a main capability (dialog) for supporting HTML-based dialogs and a subcapability dialog.bot for bot based dialogs. For now, dialog capability does not support adaptive card based dialogs,
  2. dialog.open takes a UrlDialogInfo instead of DialogInfo to enforce only HTML based dialogs,
  3. callback submitHandler takes a single object parameter containing both error and result,
  4. dialog.open takes one more optional parameter named messageFromChildHandler which is triggered if dialog sends a message to the app,
  5. dialog.open returns a function that can be used to send messages to the dialog instead of returning a ChildAppWindow,
  6. dialog.bot.open has the same function signature except it takes BotUrlDialogInfo instead of UrlDialogInfo
- Moving chat.openConversation and chat.closeConversation into a subcategory chat.conversation. Added in new APIs chat.openChat and chat.openGroupChat as a replacement to open Teams chats with one or more user
- dialog.resize() function has been moved to a new dialog subcapability and is now dialog.update.resize(). The parameter has been changed to DialogSize type

### Minor changes

- gitmagic additions to 2.0-preview for April 7, 2022. Changes merged in from V1 include: adding surfaceHub to hostClientType interface, added ISpeakingState interface and function registerSpeakingStateChangeHandler to meeting.ts and added appropriate unit tests to meeting.spec.ts"
- gitmagic additions to 2.0-preview for March 09, 2022. Changes merged in from V1 include removing private tag for sharing, making Menu APIs Public, and adding new features for files API (enum FileDownloadStatus, interface IFileItem, getFileDownloads(), openDownloadFolder())
- Copied ParentAppWindow functionality into dialog capability. In Dialogs, ParentAppWindow.postMessage becomes dialog.sendMessageToParent(message: any): void. And ParentAppWindow.addEventListener becomes dialog.registerOnMessageFromParent.
- Renamed conversation to conversations for consistency
- gitmagic additions to 2.0-preview for March 29, 2022. Changes merged in from V1 include: enabling the following APIs in meeting stage: shareAppContentToStage, getAppContentStageSharingCapabilities, stopSharingAppContentToStage, and getAppContentStageSharingState
- When hosting app will not understand standard chat requests, send them as deep links.
- gitmagic additions to 2.0-preview for February 28, 2022. Changes merged in from V1 include stageView implementation and modifying dialog.resize() and dialog.submit() to also work in FrameContexts sidePanel, content, meetingStage, and task rather than just task.

### Patches

- Adds office365 Outlook to domain allowlist
- Update comment for initializePrivateApis() explaining that this function needs to stay for backwards compatibility purposes
- In `appWindow.ts` file, `ChildAppWindow` and `ParentAppWindow` are converted back to synchronous calls because the promise was never being resolved.
- promisify stageView
- Validated media architecture
- Fixed default back compat host client runtime config to not contain location or people capability since those are not guaranteed to be supported. Added new function to dynamically generate back compat host client runtime config during initialization.
- Added `ensureInitialized` call to `registerOnMessageFromParent` function in dialog.ts and `addEventListener` function in appWindow.ts
- Remove the duplicate property of StageLayoutControls type in meetingRoom capability
- added promisified files.getFileDownloads

## 2.0.0-beta.3

Tue, 01 Mar 2022 19:50:49 GMT

### Major changes

- The API registerFocusEnterHandler has been moved from teamsCore namespace to Pages
- `core.shareDeepLink` has been moved to `pages.shareDeepLink`
- `core.executeDeepLink` has been renamed and moved to `app.openLink`

### Minor changes

- Change the `VideoControllerCallback` constructor function to make the `onRecordingStarted` callback mandatory and make `onRecordingStopped` an optional property that can be passed to the constructor. This is because without the `onRecordingStopped`, the `VideoController` doesn't do anything.

### Patches

- Source code will now throw errors instead of throwing strings across the repo.
- `null` runtimeConfig is no longer allowed during initialization. This will now throw a "Received runtime config is invalid" error.

## 2.0.0-beta.2

### Patches

- Update TSDoc @deprecated comments to include links to replaced APIs.

- Update webpack-dev-server types to match webpack 5 versions and stop generating module wrappers in MicrosoftTeams.d.ts.

- Fix warnings produced during documentation generation, including exporting additional existing interfaces.

- Update repository URLs to reference `2.0-preview` branch.

## 2.0.0-beta.1

### Patches

- Update integrity hash to valid value in README file.

## 2.0.0-beta.0

### Major changes

- The Teams JavaScript client SDK repo is now a monorepo

  - We utilized [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to turn our repo into a monorepo. <br> The files specific to the Teams client SDK have been moved to an inner directory with the name `teams-js`
  - A new TeamsJS Test App for validating the Teams client SDK has been added in the <root>/apps/teams-test-app location.

- Several API functions have been moved and renamed. <br>
  Organized top-level library functions under a core namespace. For example, `shareDeepLink` has been moved under `core` namespace. <br> Using `import * as ... from ...` will now fail. Importing now follows the following convention: <br>

  ```ts
  import { core } from '@microsoft/teams-js';
  ```

  For more detailed API organization, please refer to the **Capabilities organization introduced** section below.

- Support for `hostName` added to Context interface <br>
  The name of the host the app is running in is now part of the application context in the `hostName` property.

- Several meeting APIs changes <br>
  `meeting.requestStartLiveStreaming` and `meeting.requestStopLiveStreaming` no longer take in the parameter liveStreamState.

- Context interface changes <br>
  The Context interface has been updated to group similar properties for better scalability in a multi-host environment.

- FrameContext changes <br>
  FrameContext's `user.tenant.sku` has been renamed to `user.tenant.teamsSku` to reflect that it is used by Teams for a different purpose than from the Graph API's user.tenant.sku's.
  The `FrameContext` interface has been renamed `FrameInfo`.

- appEntity.selectAppEntity now takes in an additional parameter and the callback has reversed parameters with one one of them becoming optional.
  ```
  selectAppEntity(
    threadId: string,
    categories: string[],
    callback: (appEntity: AppEntity, sdkError?: SdkError) => void,
  ): void
  ```
  is now:
  ```
  selectAppEntity(
    threadId: string,
    categories: string[],
    subEntityId: string,
    callback: (sdkError?: SdkError, appEntity?: AppEntity) => void,
  ): void
  ```
- threadId parameter removed from callback passed into teams.refreshSiteUrl()

  ```
  refreshSiteUrl(threadId: string, callback: (threadId: string, error: SdkError) => void): void
  ```

  is now:

  ```
  refreshSiteUrl(threadId: string, callback: (error: SdkError) => void): void
  ```

- Capabilities organization introduced

  - Added App capability
    - The following APIs have been moved from `publicAPIs` to new `app` namespace:
      - `initialize`
      - `getContext`
      - `registerOnThemeChangeHandler`
    - The following APIs have been moved from `appInitialization` to `app` namespace:
      - `notifyAppLoaded`
      - `notifySuccess`
      - `notifyFailure`
      - `notifyExpectedFailure`
    - The following APIs have been added to `app` namespace:
      - `isInitialized`
      - `getFrameContext`
  - Added Core capability
    - The following APIs have been moved from `publicAPIs` to new `core` namespace:
      - `shareDeepLink`
      - `executeDeepLink`
  - Several APIs reorganized under new Pages capability:

    - The following APIs have been moved to the new `pages` namespace:
      - `registerFullScreenHandler`
      - `initializeWithFrameContext`
      - `navigateCrossDomain`
      - `returnFocus`
      - `setFrameContext` has been renamed `pages.setCurrentFrame`
    - The following APIs have been been renamed and moved from `publicAPIs` to a new Pages.AppButton sub-capability in the new `pages.appButton` namespace:
      - `registerAppButtonClickHandler` has renamed and moved to `pages.appButton.onClick`
      - `registerAppButtonHoverEnterHandler` has renamed and moved to `pages.appButton.onHoverEnter`
      - `regsiterAppButtonHoverLeaveHandler` has renamed and moved to `pages.appButton.onHoverLeave`
    - The following APIs have been moved to a new Pages.BackStack sub-capability in the new `pages.backStack` namespace:
      - `registerBackButtonHandler`
      - `navigateBack`
    - The following APIs have been renamed and moved into the Pages.Config sub-capability in the `pages.config` namespace (formerly the `settings` namespace):
      - `registerEnterSettingsHandler` has renamed and moved to `pages.config.registerChangeConfigHandler`
      - `getSettings` has been renamed `pages.config.getConfig`
      - `setSettings` has been renamed `pages.config.setConfig`
    - The following APIs have been been moved from `privateAPIs` to a new Pages.FullTrust sub-capability in the new `pages.fullTrust` namespace:
      - `enterFullscreen`
      - `exitFullscreen`
    - The following APIs have been been moved to a new Pages.Tabs sub-capability in the new `pages.tabs` namespace:
      - `getTabInstances`
      - `getMruTabInstances`
      - `navigateToTab`

  - Added Dialog capability, renamed `tasks` namespace to `dialog`, and renamed APIs

    - The following APIs have been renamed:
      - `startTask` has been renamed `dialog.open`
      - `submitTasks` has been renamed `dialog.submit`
      - `updateTask` has been renamed `dialog.resize`
      - `TaskInfo` interface has been renamed `DialogInfo`
      - `TaskModuleDimension` enum has been renamed `DialogDimension`

  - Added TeamsCore capability

    - The following APIs have been moved from `publicAPIs` to new `teamsCore` namespace:
      - `enablePrintCapability`
      - `print`
      - `registerOnLoadHandler`
      - `registerBeforeUnloadHandler`
      - `registerFocusEnterHandler`

  - Added AppInstallDialog capability
    - `openAppInstallDialog` is added to new `appInstallDialog` namespace
  - Added Calendar capability
    - The following APIs have been added to new `calendar` namespace:
      - `openCalendarItem` is added
      - `composeMeeting` is added
  - Added Call capability
    - `startCall` is added to new `call` namespace
  - Added Mail capability
    - The following APIs have been added to the new `mail` namespace:
      - `openMailItem` is added
      - `composeMail` is added
  - Added Chat capability and renamed `conversations` namespace to `chat`
    - `openConversation` and `closeConversation` have been moved to `chat` namespace
    - `getChatMembers` has been moved to `chat` namespace
  - Added Files capability
    - `openFilePreview` has moved from `privateAPIs` to `files` namespace
  - Added Legacy capability
    - The following APIs have been moved from `privateAPIs` to a new `legacy.fullTrust` namespace:
      - `getUserJoinedTeams`
      - `getConfigSetting`
  - Added Notifications capability
    - `showNotification` has moved from `privateAPIs` to `notifications` namespace
  - Added the following new capabilites from existing namespaces
    - Location
    - Media
    - Meeting
    - Monetization
    - People
    - Sharing
    - Video
    - Bot
    - Logs
    - MeetingRoom
    - Menus
    - RemoteCamera
  - Added Runtime capability
    - `applyRuntimeConfig` is added

- Promises introduced

  - The following APIs that took in a callback function as a parameter now instead return a Promise.
    - app APIs:
      - app.initialize
      - app.getContext
    - authentication APIs：
      - authentication.authenticate
      - authentication.getAuthToken
      - authentication.getUser
    - calendar APIs:
      - calendar.openCalendarItem
      - calendar.composeMeeting
    - chat APIs:
      - chat.getChatMembers
      - chat.openConversation
    - files APIs:
      - files.addCloudStorageFolder
      - files.deleteCloudStorageFolder
      - files.getCloudStorageFolderContents
      - files.getCloudStorageFolders
    - legacy APIs:
      - legacy.fulltrust.getConfigSetting
      - legacy.fulltrust.getUserJoinedTeams
    - location APIs:
      - location.getLocation
      - location.showLocation
    - mail APIs:
      - mail.openMailItem
      - mail.composeMail
    - media APIs:
      - media.captureImage
      - media.selectMedia
      - media.viewImages
      - media.scanBarCode
    - meeting APIs:
      - meeting.getAppContentStageSharingState
      - meeting.getAppContentStageSharingCapabilities
      - meeting.getAuthenticationTokenForAnonymousUser
      - meeting.getIncomingClientAudioState
      - meeting.getLiveStreamState
      - meeting.getMeetingDetails
      - meeting.requestStartLiveStreaming
      - meeting.requestStopLiveStreaming
      - meeting.shareAppContentToStage
      - meeting.stopSharingAppContentToStage
      - meeting.toggleIncomingClientAudio
    - meetingRoom APIs:
      - meetingRoom.getPairedMeetingRoomInfo
      - meetingRoom.sendCommandToPairedMeetingRoom
    - pages APIs：
      - pages.navigateCrossDomain
      - pages.tabs.navigateToTab
      - pages.tabs.getTabInstances
      - pages.tabs.getMruTabInstances
      - pages.config.getConfig
      - pages.config.setConfig
      - pages.backStack.navigateBack
    - people APIs:
      - people.selectPeople
    - others:
      - ChildAppWindow.postMessage
      - ParentAppWindow.postMessage
      - core.executeDeepLink
      - appInstallDialog.openAppInstallDialog
      - call.startCall

- Changed TypeScript to output ES6 modules instead of CommonJS
