# AI Reel Maker / Own AI — Implementation Roadmap

This checklist reflects the repository state inspected for the `agent/cinematic-script-and-api-config` branch. A screen or button is not evidence that a feature is complete; mark a feature complete only after its real operation has been tested.

## Core workflow
- [x] Home screen and reel-settings UI exist.
- [x] Script API exists at `POST /api/generate-script` on port 3002 and calls local Ollama.
- [x] Script prompt asks for scenes, visible action, camera/motion direction, and character dialogue.
- [x] Narration/voice-over is OFF by default and can be requested explicitly.
- [x] Mobile/local service URL configuration has been centralized.
- [x] Review screen accurately identifies itself as a script preview instead of claiming a rendered reel exists.
- [ ] Structured scene-plan data model (characters, visual prompts, dialogue events, timing, camera motion).
- [ ] Real video-generation and rendering backend.
- [ ] Real voice generation and dialogue timing.
- [ ] Real music generation/mixing.
- [ ] Captions derived from actual audio/dialogue.
- [ ] End-to-end MP4 export and playable-output validation.
- [ ] Persistent projects, render history, and resumable jobs.

## Original 24 feature areas + extra Movie Maker

| # | Feature | Current repository status |
|---|---|---|
| 1 | AI Script Generator | Basic API exists; cinematic screenplay prompt improved; needs runtime test. |
| 2 | AI Story Continuity | Not implemented. |
| 3 | AI Director | Prompt-level direction only; structured director/scene-plan service not implemented. |
| 4 | Regenerate Any Scene | Not implemented. |
| 5 | Smart Auto Editing | Not implemented. |
| 6 | Idea-to-Video in Supported Languages | Script API accepts a language field; end-to-end video generation not implemented. |
| 7 | AI Lyrics & Song | Not implemented. |
| 8 | AI Voice | UI/settings exist; generation backend is not present in this repository snapshot. |
| 9 | Translation | Not implemented as a workflow. |
| 10 | Auto Captions | UI/settings exist; real audio-aligned caption backend is not present in this repository snapshot. |
| 11 | AI Video Generator | Not implemented end to end. |
| 12 | Reel Editor | Not implemented as a functional timeline editor. |
| 13 | Templates | Home tiles exist; they are not complete template workflows. |
| 14 | MP4 Export | Not implemented end to end. |
| 15 | Save/Edit Projects | Not implemented with persistent project storage. |
| 16 | Remix | Not implemented. |
| 17 | Podcast Creation | Not implemented. |
| 18 | Movie-Style Creation | Script groundwork only; rendering workflow not implemented. |
| 19 | Animation | Not implemented. |
| 20 | Cartoon Creation | Not implemented. |
| 21 | Documentary Creation | Not implemented. |
| 22 | Two-Video Translation Workflow | Not implemented. |
| 23 | Male-to-Male Voice Recommendation | Not implemented. |
| 24 | Female-to-Female Voice Recommendation | Not implemented. |
| 25 | AI Movie Maker (additional feature) | Not implemented; requires screenplay, chapter/scene jobs, checkpoints, and rendering. |

## Laptop-off / always-on requirement
- [ ] Persist jobs in a database-backed queue.
- [ ] Run jobs on a remote worker that remains available after the laptop is shut down.
- [ ] Store assets in durable storage and secure access by project owner.
- [ ] Verify whether a free hosting/compute tier permits the required job duration and model use.

Local jobs cannot continue after the laptop is fully shut down. Remote processing requires an actual remote worker/compute service. Free tiers may be limited, sleep, or restrict GPU/model usage.

## Acceptance rule
A feature can be marked complete only after its end-to-end operation passes a real test. Do not use simulated progress, sample captions, a static preview, or placeholder controls as evidence of completed AI functionality.
