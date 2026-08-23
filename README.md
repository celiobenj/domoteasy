# DomotEasy

DomotEasy is a full-stack mobile solution designed to simplify the planning, budgeting, and execution of residential home automation projects. The platform connects homeowners with specialized technicians, automates project cost estimation, offers an IoT device catalog with interactive user manuals, and manages service subscription tiers.

---

## Overview

Developed as a modern residential automation assistant, DomotEasy provides an end-to-end workflow covering user onboarding, project dimensioning, equipment recommendations, technician quotes, and administration dashboards.

## Key Features

* **Project Budgeting & Recommendations:** Step-by-step assistant to specify home environments, calculate automation requirements, and generate automated cost estimates.
* **Device Catalog & Manuals:** Directory of smart home hardware with configuration guides and operational manuals.
* **Technician Directory:** Matchmaking interface to browse, evaluate, and contact certified installation technicians.
* **Subscription & Payment System:** Tiered plans and simulated payment flows for ongoing technical support and automation services.
* **Administrative Management:** Backoffice dashboard for managing users, devices, technicians, and platform metrics.

## Tech Stack

### Frontend
* **Framework:** React Native with Expo (Expo Router)
* **Language:** TypeScript
* **Styling & Architecture:** Custom design tokens, modular component hierarchy, and custom hook-based state management

### Backend
* **Runtime & Framework:** Node.js with Express
* **Database:** SQLite (managed via native driver and seed migrations)
* **Security:** JWT authentication and role-based access control middleware

## Repository Structure

```text
├── backend/
│   ├── ctrl/               # Business logic controllers (users, projects, devices, plans)
│   ├── db/                 # SQLite database instances, config, and seed scripts
│   ├── entidades/          # Domain entity models
│   ├── routes/             # RESTful API route definitions
│   └── sec/                # Authentication and authorization middlewares
├── frontend/
│   └── src/
│       ├── app/            # Expo Router file-based screen routing
│       ├── components/     # Reusable UI elements (buttons, inputs, cards)
│       ├── contexts/       # Global state providers (AuthContext)
│       ├── screens/        # Screen components and dedicated custom hooks
│       ├── services/       # Axios API client integrations
│       └── theme/          # Typography, layout, and color palettes
└── README.md
```
