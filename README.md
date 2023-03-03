<h1 align="center">
    bARlin - A Web based AR Guide for Berlin
</h1>

<p align="center">
    <a href="/../../commits/" title="Last Commit"><img src="https://img.shields.io/github/last-commit/Max-Zim/bARlin?style=flat"</a>
    <a href="/../../issues" title="Open Issues"><img src="https://img.shields.io/github/issues/Max-Zim/bARlin?style=flat"></a>
    <a href="./LICENSE" title="License"><img src="https://img.shields.io/badge/License-Apache%202.0-green.svg?style=flat"></a>
</p>

<p align="center">
  <a href="#development">Development</a> •
  <a href="#support-and-feedback">Support</a> •
  <a href="#how-to-contribute">Contribute</a> •
  <a href="#licensing">Licensing</a>
</p>


This Project was created as part of a University Class at the FOM. It aims to be a new way to explore the City of Berlin.

## About this component
This Web App can be used to explore the city of Berlin. Using the [AR.js Framework](https://ar-js-org.github.io/AR.js/)
The App should be running on all modern Devices, but was mainly tested on iOS Devices.

## Package overview
This repository includes all packages for the back-end as well as the front-end. 

There is also a OpenAPI documentation, describing the REST API of the backend used to find Sights near the user. 
[OpenAPI](./backend/src/bARlin.yaml)

## Development

### Running the App
To run the App a [Dockerfile](./Dockerfile) as well as a [docker-compose File](./docker-compose.yml) is provided. 
Make sure that Docker and docker-compose are installed on the System. Use the command: `docker-compose up --build` to build and run the bARlin container as well as the MongoDB.
The App can be reached at the following URLs, when self-hosted:
```console
http://localhost:3080
https://localhost:3443
```

### HTTPS
Since developing a AR App needs access to the camera and other sensors of the Device https is neccessary.
For developing there are Certificates provided at the [extra_files](./extra_files/test_certs/) folder. These will be used by default when starting the app.
These are self signed and will require you to accept the risk, when opening the app first time.

### Setting up the Database
To setup the database please use the [OpenAPI](./backend/src/bARlin.yaml) documentation. 
For adding the categories also use the endpoint documented in the [OpenAPI](./backend/src/bARlin.yaml) documentation. For the Body of the request the [URL List](./extra_files/urllist.json) can be used. 

## Code of Conduct

This project has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) in version 2.0 as our code of conduct. Please see the details in our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). All contributors must abide by the code of conduct.

## Working Language

We decided to apply _English_ as the primary project language.  

Consequently, all content will be made available primarily in English. We also ask all interested people to use English as language to create issues, in their code (comments, documentation etc.) and when you send requests to us. The application itself and all end-user facing content will be made available in other languages as needed.

## Support and Feedback
The following channels are available for discussions, feedback, and support requests:

| Type                     | Channel                                                |
| ------------------------ | ------------------------------------------------------ |
| **Issues**   | <a href="/../../issues/new/choose" title="General Discussion"><img src="https://img.shields.io/github/issues/Max-Zim/bARlin?style=flat"></a> </a>   |
| **Other Requests**    | <a href="mailto:maxzim0013@gmail.com" title="Email bARlin Team"><img src="https://img.shields.io/badge/email-bARlin%20Team-green?logo=mail.ru&style=flat-square&logoColor=white"></a>   |

## How to Contribute

Contribution and feedback is encouraged and always welcome. For more information about how to contribute, the project structure, as well as additional contribution information, see our [Contribution Guidelines](./CONTRIBUTING.md). By participating in this project, you agree to abide by its [Code of Conduct](./CODE_OF_CONDUCT.md) at all times.

## Licensing

Copyright (c) 2023 Hannes Rose, Max Zimmermann

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the [LICENSE](./LICENSE) for the specific language governing permissions and limitations under the License.