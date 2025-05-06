# Three Challenges I’ve Faced with MCP (and What They Reveal About Its Design Philosophy)

There’s been a lot of buzz around the benefits of Message Control Protocols (MCPs) recently. And rightly so MCPs can unlock powerful workflows for both developers and users. But in my work with MCPs, both as a developer and as a user, I’ve run into a few consistent challenges that I think are worth highlighting. These aren't deal-breakers, but they do point to underlying design decisions that impact accessibility and scalability.

## Heavy Local Dependencies Limit Access
Most MCP implementations today run locally. For the average developer, running something via Docker or npx is no big deal. But for less technical users, this creates a real barrier to entry. Setting up and maintaining a local MCP instance requires a level of system familiarity that many users especially non-engineers don’t have.

This local-first model prioritizes performance and control for developers, but at the cost of broader usability. It’s a tradeoff that might have made sense early on but becomes limiting as MCPs mature and reach a wider audience.

## Lack of Official Web and Mobile Client Support
Another issue is platform support. Most official clients are desktop-only. There’s no native web or mobile support, which means users need to roll their own agent or integration often via OpenAI SDKs or tools like pydantic-ai. While possible, these setups come with increased operational costs and reduced access to certain built-in capabilities that official clients offer.

In practice, this creates friction for anyone trying to use MCP-based systems outside of a traditional desktop environment, and it slows down adoption for more casual use cases.

## Server-Sent Events (SSE) Introduce Statefulness and High Hosting Costs
While the protocol itself doesn't strictly require it, most real-world MCP implementations rely heavily on SSE (Server-Sent Events). This approach requires building stateful, always-on servers an architectural decision that significantly increases hosting and maintenance complexity.

Unless you’re a large company with infrastructure already optimized for this (like Cloudflare, who’ve become something of a monopoly in this space), the cost and engineering overhead can be substantial. And unfortunately, those costs tend to fall on the end user.

## A Deeper Problem: The "Local First" Philosophy
All of these challenges seem to stem from one fundamental design philosophy: a preference for “Local First.” Whether intentionally or not, Anthropic and others have pushed for tooling that favors local execution over cloud-based alternatives. While the flexibility is appreciated, the reality is that local-first tools often don’t deliver a seamless experience at scale especially for non-technical users.

To their credit, there are ongoing efforts to improve things. For instance, support for Streamable HTTP is being added, which may help alleviate some issues around SSE and server statefulness. But it’s too early to tell if that will fully address the core challenges.

# Final Thoughts
I’m still excited about what MCPs can enable, and I use them regularly. But we need to acknowledge where the current implementations fall short and what that means for accessibility, cost, and long-term adoption. As the ecosystem grows, I hope we see more balanced solutions that serve both developers and everyday users.


