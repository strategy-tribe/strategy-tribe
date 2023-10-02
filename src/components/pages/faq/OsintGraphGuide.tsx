export function OsintGraphGuide() {
  return (
    <div>
      <h1 className="mt-8 mb-2 text-on-surface-p0">
        How To Create An OSINT-Graph: StrategyTribe Guide
      </h1>
      <div>
        <h4 className="mt-8 mb-6">
          <span>Why OSINT-Graph?</span>
        </h4>
        <p>
          An OSINT graph is a visual representation of data and relationships
          derived from publicly available sources like websites, social media,
          news articles etc. These graphs employ graph theory and network
          analysis to depict connections between entities, making them
          invaluable for various purposes. OSINT graphs are used to gain
          insights from open-source data, uncover hidden connections, visualise
          complex information, enhance situational awareness, support decision
          making, identify influencers, and track trends, among other
          applications. They serve as a powerful tool for understanding and
          harnessing the wealth of information available in the public domain
          effectively.
        </p>
      </div>
      <div>
        <h4 className="mt-8 mb-2">
          <span>Introduction to OSINT-Graph</span>
        </h4>
        <p>
          With every OSINT-graph, there are three main elements using nodes
          (fundamental units in data structure):
        </p>
        <ul className="ml-6 mt-4 list-disc space-y-2">
          <li className="space-y-2">
            <span>Start Node</span>
          </li>
          <li className="space-y-2">
            <span>Data Node</span>
          </li>
          <li className="space-y-2">
            <span>Process Node</span>
          </li>
        </ul>
      </div>

      <div className="mt-4 list-disc space-y-2">
        <span className="font-bold">Start Node</span>
        <p>This node denotes the starting point of a graph</p>
      </div>

      <div className="mt-4 list-disc space-y-2">
        <span className="font-bold">Data Node</span>
        <p className="pb-4">
          A valuable piece of information pertaining to a target, encompassing
          details such as an IP address, phone number, or email address. Data
          points can be assigned a rating ranging from high to low, which
          corresponds to the confidence level of data in that node. This scoring
          system will be detailed later in this guide.
        </p>
        <img
          alt=""
          src="osintGuide/image6.png"
          style={{
            marginLeft: '0.00px',
            marginTop: '0.00px',
            transform: 'rotate(0.00rad) translateZ(0px)',
            WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
          }}
        />
        <ol className="ml-10 list-decimal space-y-2 pt-4">
          <li className="space-y-2">
            <span className="font-bold">Node Name</span>
            <p>
              This is the name of the node. This will not be displayed on the
              graph, but instead is an identifier for the node. Node names are
              used to refer back to previous nodes.
            </p>
            <p className="font-bold">Every node name must be unique.</p>

            <ol className="ml-4 list-[lower-alpha] space-y-2">
              <li className="space-y-2">
                <span>
                  Node name should start with &quot;
                  <span className="font-bold">D_</span>&quot; followed by a
                  unique string, preferably related to the data in the code
                </span>
              </li>
              <li className="space-y-2">
                <span>
                  If the data in the node is an url, start the node name with
                  &quot;<span className="font-bold">D_url_</span>&quot;. This
                  will make the link appear as a clickable component
                </span>
              </li>
            </ol>
          </li>
          <li className="space-y-2">
            <span className="font-bold">Data Type</span>
            <p>
              This denotes the data type for the data or process. For instance,
              if the obtained data pertains to an IP address, it should be
              designated as &#39;ip&#39;. Examples of data types include:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li className="space-y-2">
                <span>email</span>
              </li>
              <li className="space-y-2">
                <span>address</span>
              </li>
              <li className="space-y-2">
                <span>phone</span>
              </li>
              <li className="space-y-2">
                <span>ethWallet</span>
              </li>
              <li className="space-y-2">
                <span>btcWallet</span>
              </li>
              <li className="space-y-2">
                <span>location</span>
              </li>
              <li className="space-y-2">
                <span>domain</span>
              </li>
              <li className="space-y-2">
                <span>username</span>
              </li>
            </ul>
          </li>
          <li className="space-y-2">
            <span className="font-bold">Confidence Level</span>
            <p>
              Confidence Level shows how much confidence you have in the data
              you have retrieved. The three confidence levels are:
            </p>
            <p className="pt-4">
              h: High - The data I retrieved is almost certainly accurate (95% -
              100%)
            </p>
            <p className="pt-4">
              m: Medium - The data I retrieved has a very high chance of being
              accurate (80%-95%)
            </p>
            <p className="pt-4 pb-4">
              l: Low - It is highly likely that the data I retrieved is accurate
              (60%-80%)
            </p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">Label</span>
            <p>
              Use a label for the data. This will be shown instead of the actual
              data when PII is hidden.
            </p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">Data</span>
            <p>
              This should be the actual data you need to show in the node - the
              data you found from the previous process
            </p>
          </li>
        </ol>
      </div>

      <div className="mt-4 list-disc space-y-2">
        <span className="font-bold">Process Node</span>
        <p className="pb-4">
          The methods employed to acquire a specific data point. For instance,
          initiating an ID search within [social media app] search tool.
        </p>
        <img
          alt=""
          src="osintGuide/image7.png"
          style={{
            marginLeft: '0.00px',
            marginTop: '0.00px',
            transform: 'rotate(0.00rad) translateZ(0px)',
            WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
          }}
        />
        <ol className="ml-10 list-decimal space-y-2 pt-4">
          <li className="space-y-2">
            <span className="font-bold">Node Name</span>
            <p>
              This is the name of the node. This will not be displayed on the
              graph, but instead is an identifier for the node. Node names are
              used to refer back to previous nodes.
            </p>
            <p className="font-bold">Every node name must be unique.</p>
            <p>
              Node name should start with &quot;
              <span className="font-bold">P_</span>&quot; followed by a unique
              string, preferably related to the data in the code
            </p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">Data Type</span>
            <p>
              This denotes the data type for the process. Examples of data types
              include:
            </p>
            <ul className="ml-6 list-disc space-y-2">
              <li className="space-y-2">
                <span>search</span>
              </li>
              <li className="space-y-2">
                <span>examine</span>
              </li>
              <li className="space-y-2">
                <span>phone</span>
              </li>
              <li className="space-y-2">
                <span>dehash</span>
              </li>
              <li className="space-y-2">
                <span>analyse</span>
              </li>
              <li className="space-y-2">
                <span>select</span>
              </li>
              <li className="space-y-2">
                <span>input</span>
              </li>
              <li className="space-y-2">
                <span>scroll</span>
              </li>
              <li className="space-y-2">
                <span>view</span>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div className="mt-4 list-disc space-y-2">
        <span className="font-bold">Connecting nodes</span>
        <p className="pb-4">
          A connection from one node to another should be marked with &quot;
          <span className="font-bold">-&gt;</span>&quot;
        </p>
        <p>
          To reach a piece of data, there has to have been a prior process.
          Therefore, your solution diagram should show the flow as: <br />
          Data -&gt; Process -&gt; Data… <br />
          This rule implies that establishing a direct link between two data
          points or between two processes is
          <span className="pl-1 font-bold">not</span> feasible.
        </p>
      </div>
      <div>
        <h4 className="mt-10 mb-4">
          <span>Creating your first OSINT-Graph</span>
        </h4>
        <h5 className="pb-4">Schema</h5>
        <p>
          osint-graph offers a versatile and standardised approach for crafting
          graphs within StrategyTribe.
        </p>
        <ul className="ml-6 mt-4 mb-2 list-disc space-y-2">
          <li className="space-y-2">
            <span>
              To define the formatting style for our graph, it is necessary to
              specify this at the graph&apos;s outset using the keyword
              &apos;osint&apos;, which is the designated style for all ST
              graphs.
            </span>
          </li>
          <li className="space-y-2">
            <span>
              To indicate the beginning of a graph, it is necessary that each
              graph starts with the &apos;start&apos; keyword which denotes the
              starting node of the graph
            </span>
          </li>
          <li className="space-y-2">
            <span>
              At this point, we can now connect our start node with our first
              data node. It should have the data of the target that you used to
              start the investigation with. Ideally the name of the target
            </span>
          </li>
        </ul>
        <p>
          The following code:
          <span className="font-bold">
            start -&gt; D_name(fullname, h, &quot;bob&quot;, &quot;bob&quot;)
          </span>
          should display the output as follows:
        </p>
        <div className="flex justify-center">
          <img
            alt=""
            src="osintGuide/image4.png"
            style={{
              width: '25%',
              height: '25%',
              marginLeft: '0.00px',
              marginTop: '0.00px',
              transform: 'rotate(0.00rad) translateZ(0px)',
              WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
            }}
          />
        </div>

        <p className="mb-4">
          In order to continue working on the graph, another node needs to be
          added from the data node &quot;D_name&quot;. In order to do this, we
          will refer back to the Node Name and point towards our new process
          node.
        </p>
        <img
          alt=""
          src="osintGuide/image3.png"
          style={{
            marginLeft: '0.00px',
            marginTop: '0.00px',
            transform: 'rotate(0.00rad) translateZ(0px)',
            WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
          }}
        />
        <p className="mt-8 mb-1">
          The above code will render the following chart.
        </p>
        <div className="flex justify-center">
          <img
            alt=""
            src="osintGuide/image5.png"
            style={{
              width: '25%',
              height: '25%',
              marginLeft: '0.00px',
              marginTop: '0.00px',
              transform: 'rotate(0.00rad) translateZ(0px)',
              WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
            }}
          />
        </div>
        <p>
          Now this process can be used to point to the next data you found. This
          rule of Data -&gt; Process -&gt; Data -&gt; Process… is now followed
          throughout the whole graph to display how a piece of data was
          obtained. Other rule governing the relationships between nodes is:
        </p>
        <p className="font-bold">
          Every node can have N number of children but should only have one
          parent.
        </p>
      </div>
      <div>
        <h4 className="mt-10 mb-4">
          <span>Example</span>
        </h4>
        <h5 className="mt-4 mb-4">
          <span>Code</span>
        </h5>
        <p className="mb-8">
          <code>
            osint <br />
            start -&gt; D_name(fullName,h, &quot;Target Name&quot;, &quot;Jane
            Doe&quot;) <br />
            D_name -&gt; P_google(search, &quot;Google &#39;Jane Doe&#39;&quot;)
            <br />
            P_google -&gt; D_url_coindesk(link,h, &quot;Coindesk Article&quot;,
            &quot;https://www.coindesk.com/sampleLink&quot;)
            <br />
            D_url_coindesk -&gt; P_examineCoindesk(examine, &quot;Examine
            Coindesk Article&quot;)
            <br />
            P_examineCoindesk -&gt; D_targetDomain(domain,h, &quot;Sample
            domain&quot;, &quot;onecoin.eu&quot;), D_titleFounder(title,m,
            &quot;Title&quot;, &quot;Co-Founder&quot;)
            <br />
            D_targetDomain -&gt; P_rocketReach(search, &quot;Rocket Reach:
            &#39;Jane Doe Domain&#39; &quot;)
            <br />
            P_rocketReach -&gt; D_email1(email,l, &quot;Email 1&quot;,
            &quot;email@domain.com&quot;), D_email2(email,m, &quot;Email
            2&quot;, &quot;email2@domain.com&quot;)
            <br />
            D_email1 -&gt; P_twitterSearch(search, &quot;Twitter email
            search&quot;), P_linkedinSearch(search, &quot;LinkedIn email
            search&quot;)
            <br />
            P_twitterSearch -&gt; D_twitterProfile(profile,h, &quot;Twitter
            profile&quot;, &quot;@username&quot;)
            <br />
            P_linkedinSearch -&gt; D_linkedinProfile(profile,l, &quot;LinkedIn
            profile&quot;, &quot;linkedin.com/username&quot;)
          </code>
          ;
        </p>
        <img
          alt=""
          src="osintGuide/image2.png"
          style={{
            marginLeft: '0.00px',
            marginTop: '0.00px',
            transform: 'rotate(0.00rad) translateZ(0px)',
            WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
          }}
        />
        <h5 className="mt-8 mb-2">
          <span>OSINT-Graph generated</span>
        </h5>
        <div className="flex justify-center">
          <img
            alt=""
            src="osintGuide/image1.png"
            style={{
              width: '60%',
              height: '60%',
              marginLeft: '0.00px',
              marginTop: '0.00px',
              transform: 'rotate(0.00rad) translateZ(0px)',
              WebkitTransform: 'rotate(0.00rad) translateZ(0px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
