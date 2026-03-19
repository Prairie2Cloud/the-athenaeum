# Design: BoK Opening Book — Philosophical Debate Game Tree

**Date:** 2026-03-19
**Status:** Approved for implementation
**Author:** Garnet Brown + Claude Code

## Problem

The Bridges of Königsberg Custom GPT debates philosophy using only its training data. It has no curated playbook, no record of past debates, and no way to improve. It goes soft after round 3, flattens nuanced positions, and misses textual references a real examiner would catch.

## Solution

A **philosophical debate game tree** maintained in TreeListy that serves as the examiner's evolving playbook. Like a chess opening book built from actual games, it captures strong moves, weak moves, student traps, and cross-thinker connections — curated by a human philosopher, not auto-generated.

## Architecture

### The Tree IS the Product

```
BoK Opening Book (TreeListy tree)
    |
    |-- curated by Garnet in TreeListy (visual, textual, hyperedges)
    |
    |-- exported as .md
    |
    |-- uploaded to GPT Knowledge files
    |
    v
ChatGPT examiner is sharper next session
```

The GPT is just a delivery surface. The tree is where the philosophical intelligence lives.

### Tree Structure

```
BoK Opening Book (root)
├── Ch 3: Plato (deep dive, 23q)
├── Ch 4: Aristotle (deep dive, 23q)
├── Ch 13: Kant (deep dive, 23q)
├── Ch 14: Hegel (deep dive, 22q)  ← proof of concept
│   ├── The Dialectic
│   │   ├── ★ Strong opener
│   │   ├── ⚠ Weak move (avoid)
│   │   ├── Follow-up variations
│   │   └── 🪤 Common student trap
│   ├── Master-Slave Dialectic
│   ├── Absolute Idealism
│   ├── Philosophy of History
│   └── Cross-thinker connections (hyperedges)
├── Ch 17: Nietzsche (deep dive, 22q)
├── Ch 26: Terminology (deep dive, 25q)
└── Cross-Thinker Synthesis
    ├── The Freedom Thread (Plato → Sartre)
    ├── Appearance vs Reality (Parmenides → Heidegger)
    └── The Linguistic Turn (Cratylus → Derrida)
```

### Node Schema

Each debate variation node contains:

```
Title: [position or move name]
Notes: [the actual move — what to say, what to avoid, why]
Tags:
  - signal: strong | weak | trap | depth | cross-ref
  - source: curator | tester | self-assessment
  - confidence: 0-1
  - texts: [primary source references]
  - keywords: [for GPT RAG retrieval]
```

Tags enable filtering: "show me all weak moves" or "all cross-references to Kant."

### Source Trees (Already Built)

Two existing TreeListy trees feed the Hegel deep dive:

| Tree | Size | Contains |
|------|------|----------|
| **Anti-Hegelian Tradition** | 41KB | 5 waves of critique (Existentialist, Materialist, Analytic, Post-Structuralist, Contemporary). Every major counterargument to Hegel. The Devil's Advocate playbook. |
| **Science of Logic: Doctrine of Being** | 539KB | Full Being-Nothing-Becoming dialectic mapped node by node. Quality → Quantity → Measure. Hyperedges connecting argument dependencies. The Hegel-internal depth. |

Together: sword (critiques) + shield (the Logic itself).

### Signal Pipeline

Three signal sources, weighted by reliability:

| Source | Weight | How |
|--------|--------|-----|
| **Curator (Garnet)** | 1.0 | Debates the GPT, notices weak moves, adds variations directly in TreeListy |
| **Tester feedback** | 0.6 | Testers flag "weak" or "strong" after debate rounds. Aggregated into nodes. |
| **Self-assessment** | 0.3 | GPT rates its own performance against criteria (cited text? held position? went deeper?). Lowest trust. |

For now, curator-only. Tester and self-assessment signals are future additions.

### GPT Knowledge File Strategy

ChatGPT uses RAG on Knowledge files — it searches and pulls relevant chunks, not loading everything into context. This means:

- A 100KB opening book doesn't eat context window
- Deep dives load only when the debate topic matches
- Node keywords and structured paths optimize RAG retrieval

**File split plan** (when tree exceeds ~200KB, roughly 2 months of active curation):

| File | Content | Est. Size |
|------|---------|-----------|
| `bok-core.md` | Instructions + modes + rules | ~10KB |
| `bok-bank.md` | 238 questions | ~90KB |
| `bok-openings-ancient.md` | Ch 1-10 debate variations | grows |
| `bok-openings-modern.md` | Ch 11-20 | grows |
| `bok-openings-contemporary.md` | Ch 21-26 | grows |
| `bok-cross-thinker.md` | Synthesis / hyperedge variations | grows |

ChatGPT allows up to 20 Knowledge files per GPT. Headroom for years.

### Node Format for RAG Retrieval

Each node must be self-contained and keyword-rich for ChatGPT's RAG to find it:

```markdown
## Hegel > Master-Slave Dialectic > Strong Opener
Keywords: master, slave, Phenomenology, §178, self-consciousness, lordship, bondage
Signal: strong
Texts: Phenomenology of Spirit §178-196

"Before we bring in Marx or Fanon — what is Hegel actually arguing in §178?
Is this about real historical slavery, or is it a thought-experiment about
the structure of self-consciousness? What textual evidence from the
Phenomenology supports your reading?"
```

The path (`Hegel > Master-Slave > Strong Opener`) gives context. Keywords help RAG find it. The quoted text is what the examiner should say.

## Workflow

### Curation Cycle

1. **Debate** — Voice debate on ChatGPT. Notice where the examiner goes soft.
2. **Capture** — In TreeListy, add a node under the relevant position. Tag it (strong/weak/trap).
3. **Annotate** — Add the variation: what should have been said, why, which texts.
4. **Connect** — Add hyperedges to related nodes in other chapters.
5. **Export** — When the tree has meaningful new depth, export relevant branches as .md.
6. **Upload** — Replace/add Knowledge files in the GPT editor.
7. **Test** — Debate the same position again. Did the examiner improve?

### Export Format

TreeListy JSON → markdown converter (to be built). Outputs the RAG-optimized format above. One command: "export bok-openings-modern.md from the opening book tree."

## Implementation Plan

### Phase 1: Proof of Concept (this session)
- [x] Starter tree JSON with Hegel deep dive
- [x] Anti-Hegel tree available as source
- [x] Science of Logic tree available as source
- [ ] Load starter tree into TreeListy
- [ ] Mine source trees for 10-15 more debate variations
- [ ] Export Hegel branch as .md
- [ ] Upload to GPT, test debate improvement

### Phase 2: Expand (next 2-4 weeks)
- [ ] Build Kant deep dive from debates
- [ ] Build Nietzsche deep dive from debates
- [ ] Build cross-thinker synthesis nodes
- [ ] First full export cycle (all branches → .md → GPT)

### Phase 3: Scale (month 2+)
- [ ] TreeListy export-to-markdown tool
- [ ] Split Knowledge files by chapter group
- [ ] Tester feedback pipeline (simple flag mechanism)
- [ ] Consider GPT Action for transcript auto-import

### Phase 4: Product (future)
- [ ] GPT Action → TreeListy REST endpoint for progress tracking
- [ ] Akropolis wall integration (SAGE completers)
- [ ] Claude-side equivalent (Project with knowledge files)
- [ ] Opening book as a standalone TreeListy template others can fork

## What This Does NOT Include

- Automated self-assessment (low trust, premature)
- Real-time transcript piping (manual curation is the value)
- Multiple GPTs per chapter (one GPT, multiple Knowledge files)
- Voice-to-text transcription (ChatGPT handles this)

## Success Criteria

1. After uploading the Hegel opening book, the GPT holds its position through round 5 on the master-slave dialectic without softening
2. The GPT correctly distinguishes Hegel's dialectic from thesis-antithesis-synthesis
3. Cross-thinker connections (Hegel→Kant, Hegel→Marx) appear naturally in debate
4. Garnet can curate 5-10 new nodes per week in TreeListy without friction
5. Export→upload cycle takes under 5 minutes

## Key Decision

**The tree is the product. The GPT is the delivery surface.**

This means version control, quality, and curation effort go into the tree. The GPT instructions stay stable. The Knowledge files are the variable that improves over time.
