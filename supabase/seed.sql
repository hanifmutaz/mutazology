-- ============================================================================
-- MUTAZOLOGY — seed data. Run AFTER schema.sql.
-- Mirrors lib/data/seed.ts so the live DB matches the fallback content.
-- ============================================================================

insert into moods (name, slug, color) values
 ('Dark','dark','#6c5b7b'),('Calm','calm','#5b7b6c'),('Bitter','bitter','#7b5b5b'),
 ('Hopeful','hopeful','#c9a86a'),('Restless','restless','#9b7b4a'),('Nostalgic','nostalgic','#7b6a5b'),
 ('Rational','rational','#5b6a7b'),('Uncertain','uncertain','#6b6862'),('Reflective','reflective','#7b7b8a'),
 ('Cynical','cynical','#5a5a5a')
on conflict (slug) do nothing;

insert into categories (name, slug, sort_order) values
 ('Life','life',1),('Self','self',2),('People','people',3),('Relationships','relationships',4),
 ('Ambition','ambition',5),('Failure','failure',6),('Success','success',7),('Money','money',8),
 ('Work','work',9),('Career','career',10),('Growth','growth',11),('Time','time',12),
 ('Discipline','discipline',13),('Philosophy','philosophy',14),('Society','society',15),('Technology','technology',16)
on conflict (slug) do nothing;

-- ---- THOUGHTS --------------------------------------------------------------
insert into thoughts (slug,title,body,status,featured,views,published_at,category_id,mood_id) values
 ('ilmu-itu-mahal','Ilmu Itu Mahal',
  E'Ilmu tidak selalu dibayar dengan uang.\n\nKadang dengan waktu.\nKadang dengan pengalaman.\nKadang dengan kegagalan.\n\nDan kadang dengan menjadi seseorang yang cukup bernilai sehingga orang lain bersedia membagikan sesuatu yang bernilai kepadamu.',
  'published',true,412,now(),(select id from categories where slug='growth'),(select id from moods where slug='reflective')),
 ('outgrowing-people','On Outgrowing People',
  E'Sometimes we don''t outgrow people.\n\nWe simply outgrow the version of ourselves that needed them.',
  'published',false,288,now(),(select id from categories where slug='relationships'),(select id from moods where slug='nostalgic')),
 ('cost-of-silence','The Cost of Silence',
  E'Staying quiet felt like peace for years.\n\nThen I realised it was just the interest I kept paying on words I never said.',
  'published',false,174,now(),(select id from categories where slug='self'),(select id from moods where slug='bitter')),
 ('discipline-over-motivation','Discipline Over Motivation',
  E'Motivation asks how you feel.\n\nDiscipline never asks. It just shows up and does the work while motivation is still deciding.',
  'published',false,356,now(),(select id from categories where slug='discipline'),(select id from moods where slug='rational')),
 ('time-is-the-real-currency','Time Is the Real Currency',
  E'Money can be recovered.\n\nTime cannot.\n\nWe just find it easier to protect the thing we can replace.',
  'published',false,301,now(),(select id from categories where slug='time'),(select id from moods where slug='reflective')),
 ('ambition-in-silence','Ambition Grows in Silence',
  E'The loudest ambitions rarely finish anything.\n\nReal ambition is quiet. It works when no one is watching, and it never asks for an audience to keep going.',
  'published',false,229,now(),(select id from categories where slug='ambition'),(select id from moods where slug='restless')),
 ('failure-is-tuition','Failure Is Tuition',
  E'Failure feels like loss because we count what it took.\n\nWe forget it is tuition — and the lesson is only wasted if you refuse to attend the class.',
  'published',false,198,now(),(select id from categories where slug='failure'),(select id from moods where slug='hopeful')),
 ('who-you-become','You Are the Sum of Your Repetitions',
  E'You are not who you say you are.\n\nYou are what you repeat when no decision is required.',
  'published',false,167,now(),(select id from categories where slug='self'),(select id from moods where slug='rational')),
 ('loneliness-and-solitude','Loneliness and Solitude',
  E'Loneliness is the absence of others.\n\nSolitude is the presence of yourself.\n\nSame room. Completely different tenant.',
  'published',false,143,now(),(select id from categories where slug='life'),(select id from moods where slug='calm')),
 ('comparison-tax','The Comparison Tax',
  E'Comparison is the tax you pay for living inside someone else''s highlight reel.\n\nNobody sends you the invoice. You just quietly become poorer.',
  'published',false,255,now(),(select id from categories where slug='people'),(select id from moods where slug='cynical'))
on conflict (slug) do nothing;

-- ---- REFLECTIONS -----------------------------------------------------------
insert into reflections (slug,title,subtitle,body,reading_time,status,published_at,category_id,mood_id) values
 ('why-failure-feels-expensive','Why Failure Feels Expensive','On the difference between price and value',
  E'We treat failure like a bill that arrives at the worst possible time...',6,'published',now(),
  (select id from categories where slug='failure'),(select id from moods where slug='reflective')),
 ('the-quiet-architecture-of-discipline','The Quiet Architecture of Discipline','Why systems outlast willpower',
  E'Willpower is a bad building material...',7,'published',now(),
  (select id from categories where slug='discipline'),(select id from moods where slug='rational')),
 ('money-and-the-illusion-of-arrival','Money and the Illusion of Arrival','On the number that keeps moving',
  E'There is always a number...',5,'published',now(),
  (select id from categories where slug='money'),(select id from moods where slug='cynical')),
 ('becoming-is-not-a-destination','Becoming Is Not a Destination','On living as a draft',
  E'I used to think there was a finished version of me...',5,'published',now(),
  (select id from categories where slug='growth'),(select id from moods where slug='hopeful')),
 ('the-people-we-let-go','The People We Let Go','On endings that aren''t betrayals',
  E'Not every relationship that ends was a mistake...',6,'published',now(),
  (select id from categories where slug='relationships'),(select id from moods where slug='nostalgic'))
on conflict (slug) do nothing;

-- ---- OBSERVATIONS ----------------------------------------------------------
insert into observations (slug,body,status,published_at,category_id,mood_id) values
 ('obs-people-masks',E'People rarely tell you who they are. They tell you who they want you to think they are — and then get quietly offended when you believe them.','published',now(),(select id from categories where slug='people'),(select id from moods where slug='cynical')),
 ('obs-money-seen',E'Most people don''t want to be rich. They want to be seen as rich. The two goals require completely different lives.','published',now(),(select id from categories where slug='money'),(select id from moods where slug='rational')),
 ('obs-work-meetings',E'The hardest part of any job is rarely the work. It''s the meetings about the work, the politics around the work, and the pretending that the work matters more than it does.','published',now(),(select id from categories where slug='work'),(select id from moods where slug='reflective')),
 ('obs-ambition-anxiety',E'Ambition without patience becomes anxiety. It''s the same fuel — one just forgot that engines need to cool.','published',now(),(select id from categories where slug='ambition'),(select id from moods where slug='restless')),
 ('obs-society-attention',E'A society optimised for attention will slowly forget how to reward things that take a long time to be good.','published',now(),(select id from categories where slug='society'),(select id from moods where slug='dark')),
 ('obs-tech-time',E'Every tool promises to save you time and then quietly invents new ways to spend it. The clock never actually stops.','published',now(),(select id from categories where slug='technology'),(select id from moods where slug='uncertain')),
 ('obs-relationships-absence',E'You can tell how someone truly feels about you by how they speak about you when you add nothing to the conversation.','published',now(),(select id from categories where slug='relationships'),(select id from moods where slug='nostalgic')),
 ('obs-self-hidden',E'The version of yourself you''re most afraid to show people is usually the only one they''d actually respect.','published',now(),(select id from categories where slug='self'),(select id from moods where slug='bitter'))
on conflict (slug) do nothing;

-- ---- PRINCIPLES ------------------------------------------------------------
insert into principles (number,slug,title,statement,explanation,status,category_id) values
 (1,'permanent-decisions','Permanent decisions, temporary emotions','Never let temporary emotions make permanent decisions.','The feeling that demands an immediate, irreversible choice is almost always the feeling you should distrust the most. Give it 24 hours; most storms are gone by morning.','published',(select id from categories where slug='self')),
 (2,'protect-the-mornings','Protect the mornings','Guard the first hour of your day like it decides the other twenty-three.','How you begin sets the tone you''ll spend the rest of the day either riding or fighting.','published',(select id from categories where slug='discipline')),
 (3,'value-follows-scarcity','Value follows scarcity','Become rare before you ask to be valued.','The market pays for what is hard to replace, not for what is hard to do.','published',(select id from categories where slug='career')),
 (4,'quiet-ambition','Quiet ambition','Let the work be loud so you don''t have to be.','Announcing a goal spends the same dopamine you''d get from achieving it. Stay quiet and stay hungry.','published',(select id from categories where slug='ambition')),
 (5,'distance-is-data','Distance is data','When someone shows you distance, believe it before you explain it away.','We invent generous excuses for people who''ve already made their answer clear through absence.','published',(select id from categories where slug='relationships')),
 (6,'time-before-money','Time before money','Never trade time for money at a rate your future self would refuse.','Every hour sold cheap is an hour you can''t buy back at any price.','published',(select id from categories where slug='time')),
 (7,'compound-the-boring','Compound the boring','Do the boring thing repeatedly; the boring thing compounds.','Excitement is a bad predictor of results. Boredom, endured on purpose, is a good one.','published',(select id from categories where slug='growth')),
 (8,'own-the-failure-fast','Own the failure fast','Take responsibility before you''re forced to. It''s cheaper that way.','A fault admitted early is a lesson. A fault exposed late is a scandal.','published',(select id from categories where slug='failure')),
 (9,'edit-your-inputs','Edit your inputs','You cannot think clearly on a diet of other people''s noise.','Curate what enters your mind as carefully as you''d curate what enters your body.','published',(select id from categories where slug='self')),
 (10,'stay-a-draft','Stay a draft','Hold your beliefs firmly enough to act, loosely enough to grow.','The goal isn''t to be right forever. It''s to be less wrong than you were last year.','published',(select id from categories where slug='philosophy'))
on conflict (slug) do nothing;
