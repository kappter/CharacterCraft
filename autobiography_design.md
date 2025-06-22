# CharacterCraft Autobiography Feature Design

## Overview
The autobiography feature will generate first-person narratives that reveal the internal perspective of characters, contrasting with the external third-person bio. This creates a dual-layer character depth showing both public persona and private reality.

## Core Concept
- **External Bio**: How the world sees the character (current feature)
- **Autobiography**: How the character sees themselves and their life story

## Data Structure Design

### 1. Life Milestone Templates (`autobiography_milestones.csv`)
Core life events that form the backbone of personal narratives:

| Category | Milestone | Age_Range | Template_Start | Emotional_Tone |
|----------|-----------|-----------|----------------|----------------|
| Childhood | First Memory | 3-7 | "I remember when I was..." | nostalgic |
| Education | Influential Teacher | 8-18 | "There was this teacher who..." | formative |
| Transportation | First Vehicle | 16-25 | "My first car/bike was..." | freedom |
| Work | First Job | 14-22 | "I'll never forget my first job..." | learning |
| Relationships | First Love | 15-25 | "I thought I knew what love was..." | vulnerable |
| Independence | Leaving Home | 18-25 | "The day I moved out..." | bittersweet |

### 2. Personal Struggles (`personal_struggles.csv`)
Internal conflicts and challenges not visible to the outside world:

| Category | Struggle_Type | Description | Age_Relevance | Narrative_Hook |
|----------|---------------|-------------|---------------|----------------|
| Health | Chronic Condition | Hidden illness or disability | All | "What people don't know is..." |
| Financial | Money Worries | Debt, poverty, financial stress | Adult | "I've always been good at hiding..." |
| Family | Relationship Issues | Difficult family dynamics | All | "Behind closed doors..." |
| Mental | Anxiety/Depression | Internal emotional battles | Teen+ | "Some days I wake up and..." |
| Identity | Self-Doubt | Imposter syndrome, identity crisis | Adult | "I sometimes wonder if..." |

### 3. Secret Passions (`secret_passions.csv`)
Hidden interests, dreams, and creative outlets:

| Passion_Type | Activity | Why_Secret | Age_Discovery | Expression |
|--------------|----------|------------|---------------|------------|
| Creative | Poetry Writing | Fear of judgment | Teen | "I write poems in my spare time..." |
| Artistic | Painting | Practical family expectations | Adult | "I have canvases hidden in my closet..." |
| Musical | Playing Guitar | Professional image concerns | Any | "Music has always been my escape..." |
| Intellectual | Philosophy | Seen as impractical | Adult | "I read philosophy books at night..." |
| Physical | Dancing | Cultural/gender expectations | Any | "When no one's watching, I dance..." |

### 4. Writing Styles by Age (`writing_styles.csv`)
Age-appropriate narrative voice and vocabulary:

| Age_Range | Style_Name | Characteristics | Vocabulary_Level | Sentence_Structure |
|-----------|------------|-----------------|------------------|-------------------|
| 15-25 | Discovering | Uncertain, energetic, questioning | Simple-Medium | Short, fragmented |
| 26-35 | Establishing | Confident, goal-oriented, reflective | Medium | Balanced, clear |
| 36-50 | Reflecting | Contemplative, experienced, nuanced | Medium-Complex | Longer, detailed |
| 51+ | Wisdom-Sharing | Philosophical, accepting, legacy-focused | Complex | Flowing, mature |

### 5. Formative Experiences (`formative_experiences.csv`)
Key life events that shape character development:

| Experience_Type | Event | Impact | Age_Range | Narrative_Pattern |
|-----------------|-------|--------|-----------|-------------------|
| Loss | Death of loved one | Grief, maturity | Any | "When [person] died, I learned..." |
| Achievement | Major success | Confidence, responsibility | Teen+ | "The day I [achieved], everything changed..." |
| Failure | Significant setback | Resilience, humility | Teen+ | "My biggest failure taught me..." |
| Travel | First time away | Independence, perspective | Teen+ | "The first time I left [place]..." |
| Responsibility | Caring for others | Maturity, sacrifice | Adult | "When I had to take care of..." |

## Narrative Structure

### Opening Hook
- Age-appropriate voice establishment
- Immediate personal revelation
- Sets tone for internal vs. external contrast

### Core Sections
1. **Origins**: Family, hometown, early influences
2. **Formation**: Education, mentors, early relationships
3. **Struggles**: Personal challenges, hidden difficulties
4. **Passions**: Secret interests, unfulfilled dreams
5. **Relationships**: Complex interpersonal dynamics
6. **Current Reality**: Present-day internal state

### Closing Reflection
- Age-appropriate wisdom or uncertainty
- Connection between past and present
- Hint at future aspirations or fears

## Integration with Existing System

### Data Flow
1. Character traits and demographics (existing)
2. Age-based style selection
3. Random milestone and struggle selection
4. Passion assignment based on personality
5. Narrative assembly with first-person voice

### UI Components
- "Generate Autobiography" button next to existing bio buttons
- New text area for autobiography display
- Export functionality for autobiography
- Toggle between bio and autobiography views

## Content Generation Logic

### Age-Based Branching
- **Teens/Early 20s**: Focus on discovery, uncertainty, first experiences
- **Mid 20s-30s**: Career establishment, relationship building, identity formation
- **40s-50s**: Reflection on choices, family responsibilities, career peaks
- **60s+**: Legacy thinking, acceptance, wisdom sharing

### Personality Integration
- Existing traits influence which struggles and passions are selected
- Introverted characters get different internal conflicts than extroverted
- Occupation influences work-related struggles and secret passions

### Consistency Maintenance
- Autobiography must align with basic character facts
- Internal struggles should contrast with external success indicators
- Secret passions should feel authentic to the character's background

## Technical Implementation

### File Structure
```
autobiography_milestones.csv
personal_struggles.csv
secret_passions.csv
writing_styles.csv
formative_experiences.csv
```

### JavaScript Functions
```javascript
generateAutobiography(character)
selectAgeAppropriateStyle(age)
selectPersonalStruggles(traits, age)
selectSecretPassions(personality, occupation)
assembleNarrative(elements, style)
```

### HTML Integration
- New button in character creation section
- Additional text area for autobiography display
- Export functionality for autobiography content

This design creates a rich, multi-layered character development system that reveals the gap between public persona and private reality, adding significant depth to character creation.

