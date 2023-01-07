import { useState } from "react";

import { Checking, Input, PageTemplate, CardRow } from "components";
import { calculateVideoPoker } from "calculates";

const Poker = () => {
  const [clientSeed, setClientSeed] = useState("");
  const [serverSeed, setServerSeed] = useState("");
  const [nonce, setNonce] = useState("");

  const [serverHash, setServerHash] = useState("");
  const [cards, setCards] = useState<{
    initial: number[];
    coming: number[];
  }>({
    initial: [52, 52, 52, 52, 52],
    coming: [52, 52, 52, 52, 52],
  });

  const calculate = () => {
    const { cards, seed } = calculateVideoPoker(clientSeed, serverSeed, nonce);
    setServerHash(seed);
    setCards(cards);
  };

  return (
    <div className={"mainWrapper"}>
      <PageTemplate>
        <ul>
          <li>
            Client Seed: This is a random hexadecimal string generated by your
            computer. The server does know about this client seed prior to the
            bet execution. Ideally, it should be freshly generated for each bet.
            However, some players have their "lucky" client seed which they
            prefer to keep.
          </li>
          <li>
            Server Seed: This is a random hexadecimal string generated by the
            server. It is not shared with the player (until they rotate the
            seed).
          </li>
          <li>
            Server Seed Hash: Since the server seed is not shared with the user,
            the server provides you with a hash of the server seed. This means
            that you can check (after the seed is rotated) whether the server
            was using the correct, shown server seed or not. The server seed
            hash is always unique and corresponds to a server seed being used to
            play games previously.
          </li>
        </ul>

        <Checking />

        <div className="pageContent">
          <div className="inputsRow">
            <Input
              title="Client Seed"
              subTitle="Client Seed comes from your browser and is never generated by the server."
              value={clientSeed}
              onChange={({ target }) => setClientSeed(target.value)}
            />

            <Input
              title="Nonce"
              subTitle="Nonce starts from 1 and is a count for the games you play (associated to the particular server seed)."
              value={nonce}
              onChange={({ target }) => setNonce(target.value)}
            />
          </div>

          <div className="inputsRow">
            <Input
              title="Server Seed"
              subTitle="Server Seed is generated by the server. It is only shared with you after you rotate the seed."
              value={serverSeed}
              onChange={({ target }) => setServerSeed(target.value)}
            />
            <Input
              title="Server Seed (SHA-256)"
              subTitle="This is the SHA-256 hash of the Server Seed shown prior to rotation of the seed."
              value={serverHash}
              disabled
            />
          </div>

          <div className="inputsRow">
            <CardRow
              title="Initial Cards"
              subTitle="This are the initial cards given to the user."
              cards={cards.initial}
            />
            <CardRow
              title="Coming Cards"
              subTitle="This are the coming cards."
              cards={cards.coming}
            />
          </div>

          <button
            type="button"
            className="btn btn-info marginTop"
            onClick={calculate}>
            Calculate
          </button>
        </div>
      </PageTemplate>
    </div>
  );
};

export default Poker;
