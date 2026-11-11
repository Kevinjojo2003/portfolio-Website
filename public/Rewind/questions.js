/* Reflection questions. {year} and {next} are filled in dynamically. */
window.RR_QUESTIONS = {
  reflect: [
    {
      id: 'shape', title: 'The shape of your year',
      intro: 'Start wherever feels natural. A few words are enough.',
      questions: [
        { id: 'words', prompt: 'What three words describe {year} for you?', hint: 'For example: slow, steady, unexpected. Or whatever fits.', placeholder: 'Three words, separated by commas…' },
        { id: 'moment', prompt: 'What moment from this year keeps coming back to you?', hint: 'It can be big or tiny, joyful or hard to think about.', placeholder: 'Take your time…' },
        { id: 'changed', prompt: 'What changed in your life, your relationships, or the way you see yourself?', hint: 'Change can be quiet. It can also be something that happened to you rather than something you chose.', placeholder: 'What’s different now…' },
        { id: 'surprised', prompt: 'What surprised you?', hint: 'Something about other people, about yourself, or about how things unfolded.', placeholder: 'Something you didn’t expect…' }
      ]
    },
    {
      id: 'mattered', title: 'What mattered',
      intro: 'The things, people and efforts that carried weight, including the small ones.',
      questions: [
        { id: 'proud', prompt: 'What are you proud of, even if it might seem small to someone else?', hint: 'Getting out of bed on a hard day counts. So does anything else.', placeholder: 'Something you’re proud of…' },
        { id: 'helped', prompt: 'What or who helped you through the year?', hint: 'A person, a routine, a place, a pet, a song — anything.', placeholder: 'What helped…' },
        { id: 'fellInto', prompt: 'What fell into place?', hint: 'If nothing did, you can skip this one.', placeholder: 'What worked out…' },
        { id: 'madeTime', prompt: 'What did you make time for that you’re glad you did?', hint: 'A walk, a phone call, a project, a rest.', placeholder: 'Time well spent…' }
      ]
    },
    {
      id: 'hard', title: 'What was hard and what you learned',
      intro: 'Share only what you want to. Nothing here has to be turned into a lesson.',
      questions: [
        { id: 'hard', prompt: 'What was difficult or didn’t go as planned?', hint: 'Share only what you want to. You don’t have to find a silver lining.', placeholder: 'What was hard…' },
        { id: 'learned', prompt: 'What did you learn about yourself?', hint: 'Something small is fine. “Not much” is a valid answer too — or skip it.', placeholder: 'What you noticed about yourself…' },
        { id: 'leave', prompt: 'Is there anything you’re ready to leave behind?', hint: 'A habit, a worry, an expectation, a story you’ve been telling.', placeholder: 'What you’d like to set down…' },
        { id: 'credit', prompt: 'What would you like to give yourself credit for?', hint: 'Think about effort, not only results.', placeholder: 'Credit where it’s due…' }
      ]
    },
    {
      id: 'people', title: 'The people and moments you want to remember',
      intro: 'Who and what you would like to hold on to from this year.',
      questions: [
        { id: 'people', prompt: 'Who made a difference in your year?', hint: 'Family, friends, colleagues, strangers, someone who is no longer here — whoever comes to mind.', placeholder: 'Who and how…' },
        { id: 'ordinary', prompt: 'What ordinary moment turned out to matter?', hint: 'A meal, a conversation, a commute, a quiet afternoon.', placeholder: 'An ordinary moment…' },
        { id: 'capture', prompt: 'Is there a place, conversation, song, photo, or experience that captures this year for you?', hint: 'Describe it in a few words or a few paragraphs.', placeholder: 'Something that captures it…' }
      ]
    },
    {
      id: 'other', title: 'Other parts of life', optional: true,
      intro: 'These are entirely optional. Answer only the ones that apply to your year.',
      questions: [
        { id: 'milestones', label: 'milestones', prompt: 'Milestones: was there a milestone this year — big, small, or quiet — you’d like to name?', hint: 'Only if it applies. It’s fine to skip.', placeholder: 'A milestone…' },
        { id: 'relationships', label: 'relationships', prompt: 'Relationships: is there anything about your relationships, of any kind, you’d like to note?', hint: 'Friendships, partnerships, family, community, or the absence of any of these.', placeholder: 'About your relationships…' },
        { id: 'work', label: 'work', prompt: 'Work or study: is there anything about your work, studies, or how you spend your days that you’d like to note?', hint: 'Paid or unpaid, in any form, or none. Skip if it doesn’t apply.', placeholder: 'About your work or days…' },
        { id: 'health', label: 'health', prompt: 'Health and wellbeing: is there anything about your body, mind, or energy you’d like to note?', hint: 'Share only what feels right.', placeholder: 'About your wellbeing…' },
        { id: 'creativity', label: 'creativity', prompt: 'Creativity: did you make, imagine, or play with anything?', hint: 'Art, writing, cooking, building, music — or just ideas.', placeholder: 'About your creativity…' },
        { id: 'family', label: 'family', prompt: 'Family and home: is there anything about the people or place you call home that you’d like to note?', hint: 'However you define family or home.', placeholder: 'About family or home…' },
        { id: 'travel', label: 'travel', prompt: 'Places and travel: did any place — near or far — stay with you?', hint: 'A trip, a move, a neighborhood, a room.', placeholder: 'About a place…' },
        { id: 'growth', label: 'personal growth', prompt: 'Personal growth: is there a way you feel you’ve grown, stalled, or simply changed?', hint: 'There’s no right direction.', placeholder: 'About how you’ve changed…' }
      ]
    }
  ],
  ahead: {
    id: 'ahead', title: 'Looking ahead',
    intro: 'What you hope the coming year might hold. This is imagination, not a prediction.',
    questions: [
      { id: 'room', prompt: 'What do you hope to make room for in {next}?', hint: 'Time, people, rest, a new rhythm, space to think.', placeholder: 'What you’d like to make room for…' },
      { id: 'try', prompt: 'What would you like to try, change, build, or experience?', hint: 'Small or large. A direction counts as much as a plan.', placeholder: 'What you’re curious about…' },
      { id: 'feel', prompt: 'How would you like to feel in the year ahead?', hint: 'Not how you “should” feel — only how you’d like to, if you could.', placeholder: 'How you’d like to feel…' },
      { id: 'promise', prompt: 'What is one small promise you want to make to yourself?', hint: 'Something gentle and doable.', placeholder: 'A small promise…' },
      { id: 'support', prompt: 'What support, habit, or boundary might help you move toward that?', hint: 'A person to lean on, a routine, a “no” you’d like to say.', placeholder: 'What might help…' },
      { id: 'word', prompt: 'Is there a word or theme you want to carry into {next}?', hint: 'One word is enough.', placeholder: 'A word or theme…', short: true }
    ]
  },
  moods: [
    { id: 'soft', name: 'Soft & cinematic', desc: 'Warm light, long shadows, a quiet horizon.', defaultTime: 'dusk' },
    { id: 'bright', name: 'Bright & playful', desc: 'Open color, simple shapes, a lighter touch.', defaultTime: 'day' },
    { id: 'dream', name: 'Dreamlike', desc: 'Glowing, floating, half-remembered.', defaultTime: 'night' },
    { id: 'minimal', name: 'Minimal & symbolic', desc: 'One quiet idea and plenty of space.', defaultTime: 'dawn' }
  ]
};
