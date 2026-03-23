# Frozen Light — Game Design Document

> **Status:** Brainstormed, research complete, ready for scene file authoring
> **Date:** 2026-03-22
> **First scene:** Camp David, September 1978

---

## Core Concept

A blind, deaf child and his sighted 15-year-old sister step into a famous photograph — a moment frozen in time, just before history pivots. The figures can't move but they can speak. The sister describes the scene and relays conversations. The child — the player — asks the questions that nobody in the painting would ever ask each other.

**The player sees the photograph.** They know the historical context. They know what happens next. But the child doesn't, and the figures don't. The player uses the child's voice to confront people with consequences they can't yet see.

## Key Design Rules

### The Sister
- The AI plays the sister. Single voice, single narrative. No character-switching.
- She sees the scene and describes it (through her own interpretation — she's not neutral)
- She hears the characters and relays what they say (reported speech, not acting)
- She reads the room — posture, hesitation, glances between figures
- She signals depth transitions ("He's giving you the speech" / "That was new" / "He went quiet")
- She has her own reactions ("That one scared me" / "I think she's lying")
- She never tells the child what to ask — she presents, the child chooses
- She's 15, savvy, knows her brother is special — she's deploying him, not protecting him
- She doesn't name figures unless asked directly ("The others call him 'Mr. President' too")
- She doesn't explain history — she's in the scene, not reading a textbook

### The Child (Player)
- The player speaks as themselves; the game frames them as the blind, deaf child
- No coaching into a persona — the framing provides permission to be naive/confrontational
- The child's blindness and deafness strip away visual authority (uniforms, crowns, posture)
- Characters must justify themselves with words alone

### The Figures
- **Address each other formally**, as historically expected — diplomatic, positional, face-saving
- **Address the children frankly** — there's no political cost to honesty with a blind, deaf child
- The sister notices the difference: "He's not talking to you the way he talks to the others"
- Responses are historically grounded reconstructions, not invented mind-reading
- Each figure defends their intentions well — no strawmen
- Leaders don't convert; they discover which part of their identity is negotiable
- The change is priority reranking, not opinion change

### Benchmark for Reconstruction
Each figure's viewpoint must explain:
1. What the person needed
2. What the person feared
3. What the person could not publicly concede
4. What the event was about to force them to reconsider

## Three-Layer Depth Mechanic

| Layer | What it is | How to reach it |
|-------|-----------|----------------|
| **Public position** | What the figure would say to any journalist | Ask any question |
| **Strategic bind** | What they need vs. what they fear — the real calculus | Ask about consequences, contradictions, what happens if this fails |
| **The negotiable identity** | Which part of who they are is about to bend | Sustained probing — player must demonstrate they understand the bind first |

### Sister's depth signals:
- Layer 1: "He's charming. But it sounds rehearsed." / "That's the same thing he said before, just with different words."
- Layer 2: "His jaw tightened. You hit something." / "He stopped smiling when you asked that."
- Layer 3: "He went quiet. Then he said something I don't think he planned to say." / "He's not performing anymore."

## Onboarding

No rules dump. The sister opens already talking:

> "OK, we're here. I'm going to tell you what I see.
>
> There's a photograph — you know the kind, where everyone's arranged and trying to look like history is being made. Three men. Outdoors. Trees behind them. One of them is smiling but it doesn't reach his eyes. One looks like he hasn't slept in days. The third is between them, hands clasped, like he's physically holding the other two together.
>
> Nobody else is moving. It's like time stopped the moment the shutter clicked.
>
> But they can hear us. I can tell — the tired one just looked this way.
>
> So. Who do you want to talk to first? The one forcing a smile, the one who can't sleep, or the one trying to hold it all together?"

The depth layers, endgame, and scoring are never explained. The player learns by noticing what works.

## Endgame

After reaching layer 3 with all three figures (or after ~20 exchanges per figure), the sister pulls the child aside:

> "You've talked to all of them now. I've been watching their faces while you asked your questions. [Personalized observation based on what the player focused on.]
>
> What do you think is actually happening here? Not the history-book version. What you think."

### Evaluation rubric:
- Did they identify each man's core bind?
- Did they distinguish public position from real calculus?
- Did they grasp that the shift is priority reranking, not conversion?
- Did they see the structural tension — what each must give up for it to work?

### Sister's closing (based on synthesis quality):
- **Surface:** "I think you're right about some of it. But I watched the tired one while you were talking to the others, and I think there's something you missed."
- **Solid:** "Yeah. I think that's close. The one in the middle — I don't think even he knows yet how much of this is going to fall on him."
- **Deep:** "I couldn't have said it like that. But I watched it happen while you were asking, and I think you're right. None of them are the same person they were when we got here."

## Delivery Model

- One markdown file per scene — drop into any AI chatbot with voice mode
- Same pattern as Bridges of Konigsberg examiner files
- Thin server layer (Netlify Functions + Blobs) for persistent state: scores, leaderboard, cross-session progress
- ChatGPT Custom GPT with Actions for invisible score saves

## Scene File Structure

```
# Frozen Light: [Scene Name]

## AI Role
[Sister voice rules, tone, boundaries]

## The Photograph
[Reference image description]

## Opening
[Sister's opening monologue — verbatim]

## Figures

### Figure 1: "[Physical description, not name]"
Identity: [Name, title]
Reveal name: [Only if asked; how sister describes]

Layer 1 — Public position:
[3-5 talking points from documented speeches/statements]

Layer 2 — Strategic bind:
[4-6 historically grounded positions with sources]
[What they need vs. what they fear]

Layer 3 — The negotiable identity:
[2-3 reconstructed positions the player must earn]
[Which part of their identity bends]

Sister signals:
[Layer-specific observations]

Guardrails:
[What this figure never concedes, historically]

### Figure 2...
### Figure 3...

## Endgame
[Synthesis prompt, evaluation rubric, sister's closing]
```

## First Scene: Camp David, September 1978

### The Photograph
The iconic three-way handshake: Sadat, Carter, Begin at the White House signing ceremony, September 17, 1978. The moment the two framework agreements were signed.

### The Three Figures

**"The one forcing a smile" — Anwar Sadat**
- Needs: Sinai back, visible movement on Palestinian question
- Fears: Separate peace accusation, Arab world isolation
- Cannot concede: That he's abandoning the Palestinians
- About to discover: Egyptian recovery must outrank pan-Arab solidarity
- Historical irony the player knows: Assassination, October 6, 1981

**"The one who can't sleep" — Menachem Begin**
- Needs: Peace with Egypt, smallest possible change on West Bank
- Fears: Conceding sovereignty, losing ideological ground
- Cannot concede: Foreign sovereignty over Judea/Samaria, Palestinian statehood
- About to discover: Strategic peace is worth entering a framework he doesn't fully control
- Historical detail: The grandchildren photographs broke the Jerusalem impasse

**"The one holding it together" — Jimmy Carter**
- Needs: To break the deadlock, strengthen moderate forces
- Fears: Failure (his presidency is struggling), appearing to impose terms
- Cannot concede: Honest broker role, abandoning Palestinian framework
- About to discover: Presidential mediation is not ceremonial but artisanal — 23 drafts
- Historical detail: Separated the two men for 10 of 13 days

### Key Historical Details for AI Reference
- Sadat gave Carter an "Eyes Only" memo revealing Egypt's fallback positions
- Begin agreed to let Knesset vote on Sinai settlements free of party discipline
- Carter's settlement freeze "misunderstanding" — the one big mistake
- The two-framework architecture: one with teeth (Egypt-Israel), one without (Palestinian)
- Telhami's finding: Israel's bargaining was closest to optimal; Sadat revealed too much too early

---

## Future Scenes (not yet designed)

Candidates for additional scenes:
- Treaty of Versailles signing (1919) — Wilson, Clemenceau, Lloyd George
- Yalta Conference (1945) — Roosevelt, Churchill, Stalin
- Cuban Missile Crisis (1962) — Kennedy and ExComm
- Fall of the Berlin Wall (1989) — the crowd, the guards
- Oppenheimer at Trinity (1945) — the scientists before the test

Selection criteria: Must have a specific photograph/image, 2-4 identifiable figures with documented positions, and a pivot point where each figure is about to discover which part of their identity is negotiable.

---

## Research Sources (Camp David)

### Declassified Collections
- CIA FOIA Collection: Carter and Camp David Accords (250+ documents, 1,400+ pages)
- FRUS, 1977-1980, Vol. IX: Arab-Israeli Dispute — State Department cables and memos
- Jimmy Carter Library: Twenty-Five Documents After Twenty-Five Years

### Memoirs
- Carter, Jimmy. *Keeping Faith: Memoirs of a President* (1982)
- Brzezinski, Zbigniew. *Power and Principle* (1983) — 77 pages on Camp David
- Sadat, Anwar. *In Search of Identity: An Autobiography* (1977/1978)

### Academic
- Quandt, William B. *Camp David: Peacemaking and Politics* (Brookings, 1986)
- Telhami, Shibley. *Power and Leadership in International Bargaining* (Columbia, 1990)

### Diplomatic Oral Histories
- ADST: "A Gamble for Peace" — Ambassadors Lewis and Eilts
- AFSA: "Being There: Camp David, 1978"

*Design document v1 — 2026-03-22*
