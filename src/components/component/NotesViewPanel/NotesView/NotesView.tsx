import React from "react";

const NotesView = () => {
  return (
    <div className="flex-1 p-4">
      <div className="prose text-white">
        <h3>Agenda</h3>
        <ul>
          <li>Discuss project timeline</li>
          <li>Review team responsibilities</li>
          <li>Finalize deliverables</li>
        </ul>
        <h3>Notes</h3>
        <p>
          The team discussed the project timeline and agreed to adjust the
          deadlines for the next phase. We also reviewed each team member&apos;s
          responsibilities and made some updates to the deliverables.
        </p>
        <pre>
          <code>
            const myFunction = (param) =&gt; &#123;console.log(`Hello,
            $&#123;param&#125;!`)&#125;; myFunction(&apos;world&apos;);
          </code>
        </pre>
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        Last update at 12:00pm
      </div>
    </div>
  );
};

export default NotesView;
