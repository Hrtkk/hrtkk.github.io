# ByteScribble editorial and indexing audit

Audit date: 22 August 2026

This is an editorial record, not publishable blog content. The review preserves the
author's original writing and uses `7.5/10` as the minimum score for the main collection.

## Scoring rubric

Each article was scored out of 10 across five equally weighted areas:

1. Original insight and point of view
2. Technical accuracy and depth
3. Structure and clarity
4. Practical usefulness
5. Publication readiness (title/description fit, links, sources, and polish)

## Decisions

| Article | Score | Decision | Main reason |
| --- | ---: | --- | --- |
| Data Replication: Single-Leader, Multi-Leader, and Leaderless | 8.2 | Keep published | The strongest and most complete explanation; good trade-off framing and useful breadth. |
| Database Partitioning: Splitting Data Without Splitting Headaches | 7.8 | Keep published | Focused, coherent, and technically useful despite reading like condensed study notes. |
| The Architecture of Apache Flink | 7.6 | Keep; rework next | Good operational detail, but the description promises checkpoint barriers that the body does not explain. |
| Change Data Capture with Debezium: PostgreSQL and Oracle | 7.5 | Keep; rework next | Useful connector/snapshot detail, but the title/description promises configuration that is absent and the PostgreSQL failover section needs a current-version update. |
| Stream Processing: Introduction | 5.8 | Archive | Generic overview with little original insight, evidence, or depth. |
| Fundamentals on Stream Processing (Part 02) | 5.2 | Archive | Confusing series numbering, grammar problems, thin explanations, and dated internal links. |
| Fundamentals on Stream Processing (Part 03) | 5.5 | Archive | Useful outline, but duplicate title, frequent language errors, and oversimplified delivery guarantees. |
| Introduction to Apache Kafka | 4.8 | Archive | Too short and generic; the description promises logs, partitions, and consumer groups that the body barely covers. |

Archived posts retain their original URLs and bodies, but are removed from discovery,
RSS, recommendations, and the sitemap. Direct visits receive `noindex, follow` and an
archive notice, so each post can be rewritten and republished without losing its URL.

## Rework queue

### 1. Change Data Capture with Debezium

- Add the connector configuration promised by the description, or narrow the title and description.
- Update PostgreSQL failover coverage: PostgreSQL 16 supports logical slots on replicas;
  PostgreSQL 17 supports automatically synchronized failover slots when configured.
- Separate PostgreSQL and Oracle snapshot guarantees from operational caveats.
- Cite the current Debezium connector documentation and the matching PostgreSQL version.

Primary references:

- https://debezium.io/documentation/reference/stable/connectors/postgresql.html
- https://www.postgresql.org/docs/current/logicaldecoding-explanation.html

### 2. The Architecture of Apache Flink

- Either add checkpoint-barrier and exactly-once sections or remove those claims from the description.
- Update the component model to distinguish JobManager process, Dispatcher, ResourceManager, and JobMaster.
- Add a diagram showing job submission, slots, task chaining, network exchange, and checkpoint storage.
- Cite the stable Flink architecture and fault-tolerance documentation.

Primary references:

- https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/flink-architecture/
- https://nightlies.apache.org/flink/flink-docs-stable/docs/learn-flink/fault_tolerance/

### 3. DDIA notes

- Keep the strong first-principles explanations, but add examples that come from personal
  engineering experience so the posts become more than chapter summaries.
- Replace legacy Jekyll links with the current clean URLs.
- Add a short source/further-reading section and verify product-specific claims against
  current official documentation before the next publication date.

## Taxonomy

Use one stable research area plus multiple fine-grained tags per post.

| Research area | Example tags |
| --- | --- |
| Distributed Systems | kafka, flink, ddia, debezium, replication, partitioning |
| AI & ML | agents, evaluation, rag, inference, fine-tuning |
| Speech & Audio | asr, tts, diarization, codecs, audio-understanding |
| Vision & Video | vision, video-generation, video-understanding, streaming |
| Multimodal AI | multimodal, cross-modal-retrieval, fusion |
| Context & Memory | long-context, retrieval, memory, personalization |
| Manaska Research | adaptive-learning, tutoring, knowledge-modeling, experiments |

Empty research areas should not generate indexable landing pages. They become live when
the first original article is published.

## Indexability snapshot

- `https://bytescribble.com` returns `200`, redirects HTTP, `www`, and
  `https://hrtkk.github.io` to the canonical HTTPS domain, allows search crawling, and
  exposes a sitemap index.
- `https://notes.bytescribble.com` returns `200`, redirects HTTP to HTTPS, allows search
  crawling, and exposes a sitemap index.
- The live sitemaps contained 29 main-site URLs and 64 notes-site URLs at audit time.
- Public `site:` searches returned no results for either domain. This is a discovery
  warning, not definitive proof of non-indexing; only Google Search Console URL
  Inspection can report Google's per-URL indexed state.
- Cloudflare injects managed crawler directives before the repository's own robots
  rules. Search indexing remains explicitly allowed; several AI-training crawlers are
  blocked. This does not block ordinary Google Search crawling.

## Search Console checklist

1. Verify the Domain property for `bytescribble.com` so the root and `notes` subdomain
   are covered together.
2. Submit both sitemap indexes:
   - `https://bytescribble.com/sitemap-index.xml`
   - `https://notes.bytescribble.com/sitemap-index.xml`
3. Inspect the homepage, blog index, one retained article, notes homepage, and one note.
4. Review **Page indexing** for `Crawled - currently not indexed`, duplicate canonical,
   soft 404, and redirect errors.
5. After this organization pass is deployed, validate that archived URLs are excluded
   from the sitemap and report `noindex, follow` on direct inspection.
