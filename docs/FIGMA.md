# Figma design map

File: https://www.figma.com/design/akRHKhz6PoLU6r7jPtamQn/Untitled (folder "Simsree website", page `0:1`)

Rule: where a page has an "… New" frame, **the New frame is the final design**.
Every page has a desktop frame (1440 px) and usually a mobile frame (375 px).
IDs are Figma node ids — pass them as `nodeId` to the Figma MCP tools.
Slugs under `/academics/`, `/admissions/` and `/students/committees/` are illustrative; the real ones come from Sanity.

## Final frames per route

| Route | Desktop | Mobile | Notes |
|---|---|---|---|
| `/` | `1:6605` Homepage New | `1:6943` Home • Mobile | |
| `/about` | `1:7275` | `1:11176` | |
| `/about/history` | `1:7493` | `1:11360` | |
| `/about/directors-message` | `1:8025` Director New | `1:11659`? | old: `1:7844`. Mobile frame is named "History" but sits after Director New — unverified |
| `/about/rankings` | `1:8208` | `1:11806` | |
| `/about/campus-life` | `1:10897` Campus Life New | `1:12018` | old: `1:10549` |
| `/about/alumni` (Illustrious) | `1:8844` Illustrious New | `1:12237` Illustrious New | old: `1:8420` |
| `/about/student-driven-system` | `1:9266` | `1:12629` | committee section has a copy: `1:29879` / `1:33170` |
| `/alumni-portal` | `1:9645` | `1:12908` | |
| `/about/simarthan` | `1:10357` | `1:13343` | old: `1:10167` (vertical list; `1:10357` is the card grid) |
| `/placements` | `1:1442` | `1:3243` | |
| `/placements/why-recruit` | `1:3034` | `1:3748` | |
| `/placements/reports` | `1:2590`, `1:2773`, `1:2912` | `1:3908`, `1:4046`, `1:4140` | 3 frames — probably tab states, unverified |
| `/placements/partners` | `1:1960` | `1:4217` | |
| `/placements/contact` | `1:2211` | `1:4420` | |
| `/placements/recruiter-engagement` | `1:2427` | `1:4587` | |
| `/academics` | `1:14881` | `1:15646` | |
| `/academics/mms` | `1:13510` | — | |
| `/academics/msc-finance` | `1:13798` | — | |
| `/academics/mfm` | `1:14081` | — | |
| `/academics/mmm` | `1:14339` | — | |
| `/academics/phd` | `1:14597` | `1:15980` | |
| `/academics/faculty` | `1:15263` | `1:16197` | |
| `/admissions` | `1:28312` | `1:28883` | |
| `/admissions/mms` | `1:26018` | — | |
| `/admissions/msc-finance` | `1:26466` | — | |
| `/admissions/mmm` | `1:27861` | — | |
| `/admissions/mfm` | `1:26959` | — | |
| `/admissions/phd` | `1:27410` | `1:29387` | |
| `/admissions/downloads` | `1:28715` | `1:29758` | |
| `/students` | `1:16535` | `1:18015` | |
| `/students/achievements` | `1:16825` | `1:18255` | |
| `/students/batch-profile` | `1:19438` | `1:18462` | |
| `/students/body-structure` | `1:17355` | `1:19009` | |
| `/students/life` | `1:17664` | `1:19250` | |
| Leadership Directory | `1:17074` | `1:18683`, `1:18785`, `1:18910` | committee section also has `1:32688`, `1:32828`, `1:33038` — unverified |
| `/students/committees/placement` | `1:30258` | `1:33449` | |
| `/students/committees/alumni` | `1:30461` | — | |
| `/students/committees/corporate-relations` | `1:30664` | — | |
| `/students/committees/course-coordinators` | `1:30866` | — | |
| `/students/committees/e-cell` | `1:31068` | — | |
| `/students/committees/events` | `1:31270` | — | |
| `/students/committees/finance-forum` | `1:31472` | — | |
| `/students/committees/infra-tech` | `1:31674` | — | |
| `/students/committees/marketing-media` | `1:31876` | — | |
| `/students/committees/hrudaya` | `1:32079` | — | |
| `/students/committees/research-consulting` | `1:32282` | — | |
| `/students/committees/ssr` | `1:32485` | — | |
| `/contact` | `1:5405`? | `1:6092` | 6 desktop versions (`1:4702 4931 5186 5405 5629 5844`). `1:5405` is the most complete of the 4 checked; `1:5629`, `1:5844` not yet checked |
| `/events` | `1:19737` | `1:22738` | |
| `/events/simerations` | `1:21113`, `1:21422` | `1:24604`, `1:24864` | 2 frames — version or sub-page, unverified |
| `/events/flagship` | `1:21923` | `1:25303` | |
| Industry Events Hub (no route yet) | `1:20004` | `1:23564`, `1:24010`, `1:24387`? | mobile frames are named "Events" — unverified |
| `/events/development-programmes` | `1:20639` | `1:22956`, `1:23200`, `1:23403` | 3 mobile frames — probably tab states, unverified |
| `/events/news` | `1:22375` | `1:25704` | |

## Shared parts

| Part | Node |
|---|---|
| Design tokens (colours, type) | `6:17433` Variables (`6:17434` Header, `6:17436` Heading, `6:17438` Content) |
| Navbar | `1:33632` Nav bar section (`1:33633`, `1:33689`) |
| Footer desktop / mobile | `1:19732` / `1:19733` |
| Card, Container | `1:19735`, `1:19734` |
| Blog blocks | `1:20955`, `1:21049`, `1:21102` |

## Figma MCP limit

The Figma account is on the **Starter plan**, which caps Figma MCP tool calls.
The cap was hit on 2026-09-22 while checking the unverified rows above.
Use calls sparingly: one `get_design_context` per final frame, not whole-page `get_metadata` on `0:1` (~3.4M chars).
