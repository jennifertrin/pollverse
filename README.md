# Pollverse 

## 🌎 Overview

Pollverse is a metaverse-based game amplifying better public policy. It digitally transforms the city into a new network state that enables wider inclusion, better understanding of the implications of public policy, and better technical procurement decisions. 

Governments and civic organizations encounter more civic disengagement especially amongst youth and immigrants, struggle to outreach to their communities at scale, and make poor decisions on how to modernize their tech stack. 

Users onboard onto Pollverse using their wallet and verifying their location using Civic Key. Users maintain their anonymity and privacy and do not need to fear governments identifying them based on their race, immigration status, or any other bias.

Pollverse includes a web3 forum where governments can post threads and residents can reply to threads. Governments can summon a thread for anything from feedback on procurement of technical services to infrastructure designs. For threads on infrastructure designs, residents can auto-generate designs that they are better for implementation.

Residents can also experience infrastructure designs using AR/VR, vote on the proposals in-app, and even donate to community infrastructure projects.

## Preview

**Local**

```
cd app
yarn
yarn dev
```

**Production**

https://pollverse.vercel.app

## Important Links
**Slide Deck**: https://www.canva.com/design/DAFdNCi7i7U/CylG5ZlqonKbK_tGHMVRaA/edit?utm_content=DAFdNCi7i7U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

**Marketing site**: https://pollverse.my.canva.site/

**Demo Video**: https://youtu.be/cwMABMoIxNE

**Live app**: https://pollverse.vercel.app

**DAO Example on Realms**: https://app.realms.today/dao/3qnpdzqPZefVvD9LjJQee8oFTQAqWTbX1f3hSeh1SYAX?cluster=devnet

#### Demo 3D Scene Experiences

**City Park (Unity WebGL)**: https://play.unity.com/mg/other/webgl-builds-315155

**Proposal for New Sign Displays (AR)**: 

- Example Video: https://youtu.be/DL7c-6guawA

- AR Demo: https://adobeaero.app.link/Oi05Y58f7xb

**Proposal for New Bike Racks (AR)**:

- Example Video: https://youtube.com/shorts/AMWx08lYVVY?feature=share

- AR Demo: https://adobeaero.app.link/yeQVJXs37xb

## Technical Overview

- React Application built on NextJS framework
- MongoDB as database


- [Solana Wallet Adapters](https://github.com/solana-labs/wallet-adapter) for wallet connection
- [Civic Key](https://www.civic.com/) for human verification (I intended to use Civic Key for location verification as well. However, the Civic team suggested human verification for demo purposes due to cost of their location verification service).
- [Dispatch SDK](https://www.dispatch.forum/) for web3 Discourse-like forum
- [Dialect SDK](https://www.dialect.to/) for in-app web3 notifications
- [Realms SDK](https://app.realms.today/discover) for DAO and proposal creation
- [Polycam](https://poly.cam/) for 3D scanning of objects, Blender for editing 3D objects, and [Adobe Aero](https://www.adobe.com/products/aero.html) to create AR experiences
- Solana Cli for DAO membership distribution
- [Solana Pay SDK](https://github.com/solana-labs/solana-pay) for community donations to public infrastructure projects
- [Blockade Labs API](https://www.blockadelabs.com/) to enable user-generated designs
- [Unity](https://unity.com/) for user-perspective game example

## Features

### 🙋‍♀️ User Onboarding

In the US, legal residents without citizenship can't participate in voting. Governments and civic organizations in jurisdictions with large  legal immigrant populations suffer from more civic disengagement. 

Pollverse verifies users' legal residency and citizenship upon signup. Citizens will still have full access to the political system. However, governments can introduce  DAO-like proposals for community matters where citizens and legal residents can vote and post opinions. 

**Built Using**: Solana Wallet Adapters, [Civic Key](https://www.civic.com/), Solana Cli

### 🗳️ Voting on Community Matters

By opening certain aspects of government decision-making to the community, governments can quickly access top industry talent for faster and more informed decisions. For instance, implementing DAO-like proposals for procurement selection could prevent contractor overcharging and scams, such as the case of the Canadian government paying $54 million for a consultancy to build the ArriveCAN application, a simple mobile and web application to upload COVID-19 related travel documentation. In a DAO proposal process, verified software developers in Canada could raise concerns about the app building being overpriced. Underfunded governments and civic organizations can unlock the community to help them make better decisions. 

For threads requesting feedback on designs of public infrastructure, users can utilize Blockade Labs' skybox to generate their own designs and effectively, help governments prototype building public infrastructure faster.

**Example of using Blockade Labs' skybox to generate a design of more favorable public infrastructure within Pollverse**

<img width="956" alt="Screen Shot 2023-03-14 at 10 17 34 PM" src="https://user-images.githubusercontent.com/38402540/225478838-afdd23d7-cb8d-4d7d-9431-e50081320898.png">

**Built Using**: [Dispatch](https://www.dispatch.forum/), [Realms](https://app.realms.today/realms?cluster=devnet)

### 📥 Notifications

Governments and civic organizations face a significant challenge in effectively communicating with residents on community matters in a cost-effective manner. While they often invest resources and are legally obligated to notify residents about certain civic events such as elections or disruptions to water supply, they lack affordable digital channels to reach residents and notify them about critical feedback surveys on government performance. This lack of accessible channels can result in lower participation rates, preventing valuable insights into the needs and concerns of residents from being captured.

Here are some examples of posters that call for feedback on government services:

A poster encouraging feedback on transportation services in Seattle posted at a local YMCA.

![20230215_110912](https://user-images.githubusercontent.com/38402540/222335217-989c2f2e-fdea-453b-aee5-0431d0e47177.jpg)

A poster advertising a virtual meeting to collect feedback on Seattle light rail displayed at a local coffee shop.

![20230222_170022](https://user-images.githubusercontent.com/38402540/222335239-22ed2efa-439d-4ea7-b4ce-1524b3f4c8f2.jpg)

Pollverse allows users to subscribe to notifications on new forum threads and DAO proposals using their email, Telegram, SMS, or through their crypto wallet. Governments and civic organizations can easily and affordably communicate directly with their constituents in a timely manner. 

In the long run, to prevent spam, Pollverse could implement a voting system for residents to determine which organizations can access their contact information for sending notifications. Additionally, residents could choose the types of notifications they would like to receive.

**Built Using**: [Dialect](https://www.dialect.to/)

### 🎧 VR/AR Experiences

Closed, non-interactive design plans for urban development hinder community alignment and participation. For example,  the construction of highways through American urban cores in the 1950s and 1960s had negative social and environmental impacts. Imagine if  constituents could experience proposed designs and identify potential impacts before construction. The layout of the modern American city would be more prosperous, equitable, and environmentally safe.

Pollverse's VR/AR experiences let constituents experience proposed designs and their potential impact on cities before construction, providing a more informed decision-making process. This game-like approach attracts younger constituents to become more engaged.

I created AR experiences of public infrastructure designs with links to a Realms DAO proposal and Dispatch forum thread within them. 

I utilized the Polycam app to 3D scan real-life public infrastructure objects such as signs and bike racks in Bellevue, Washington. Afterwards, I refined the 3D assets in Blender. I used Adobe Aero to develop the AR experiences with the refined 3D assets. 

**AR Examples**

Users can see how the 3D designs would look like in their current surrounding using the AR Demo links (iOS users can view directly in their phone browser and Android users need to download the Adobe Aero app). Users can click on the Vote box to get directly sent to the Realms DAO proposal and Feedback box to get directly sent to the Dispatch forum thread.

**Example Video**: https://youtu.be/DL7c-6guawA

**AR Demo**: https://adobeaero.app.link/Oi05Y58f7xb

<img width="416" alt="New Sign Display AR Screenshot" src="https://user-images.githubusercontent.com/38402540/225167686-2f5871e0-200e-46c1-8bda-5114146b0535.png">

**Example Video**: https://youtube.com/shorts/AMWx08lYVVY?feature=share

**AR Demo**: https://adobeaero.app.link/yeQVJXs37xb

<img width="405" alt="New Bike Lane Display AR Screenshot" href="https://adobeaero.app.link/yeQVJXs37xb" src="https://user-images.githubusercontent.com/38402540/225168201-afb32635-94cd-447c-b43b-b7db3c75da07.png">

**WebGL Game Example**

<img width="1024" alt="Screen Shot 2023-03-14 at 7 03 47 PM" src="https://user-images.githubusercontent.com/38402540/225185815-cb1fde5a-7d0e-403c-bcf6-603d0e81cea9.png">

**Built Using**: Unity, [Blockade Labs Skybox](https://www.blockadelabs.com/), 3D Scanning using [Polycam](https://poly.cam/), Blender, Adobe Aero



