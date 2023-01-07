import { useState } from "react";
import { Checking, Field, Input, PageTemplate } from "components";
import { calculatePlinko, PlinkoRisk } from "calculates";

const riskValues: PlinkoRisk[] = ["low", "medium", "high"];
const rows = [8, 9, 10, 11, 12, 13, 14, 15, 16] as const;

const Plinko = () => {
  const [clientSeed, setClientSeed] = useState("");
  const [serverSeed, setServerSeed] = useState("");
  const [nonce, setNonce] = useState("");
  const [row, setRow] = useState(12);
  const [risk, setRisk] = useState<PlinkoRisk>("medium");

  const [serverHash, setServerHash] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    const { result, server_seed_hash } = calculatePlinko(
      clientSeed,
      serverSeed,
      nonce,
      row,
      risk,
    );

    setResult(result + "x");
    setServerHash(server_seed_hash);
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
          </div>

          <div className="inputsRow">
            <Input
              title="Server Seed"
              subTitle="Server Seed is generated by the server. It is only shared with you after you rotate the seed."
              value={serverSeed}
              onChange={({ target }) => setServerSeed(target.value)}
            />
            <Input
              title="Nonce"
              subTitle="Nonce starts from 1 and is a count for the games you play (associated to the particular server seed)."
              value={nonce}
              onChange={({ target }) => setNonce(target.value)}
            />
          </div>

          <div className="inputsRow">
            <Field
              title="Rows"
              subTitle="The selected number of rows in your game">
              <select
                className="form-select"
                value={row}
                onChange={({ target }) => setRow(Number(target.value))}>
                {rows.map((v) => (
                  <option value={v}>{v}</option>
                ))}
              </select>
            </Field>

            <Field
              title="Risk"
              subTitle="The risk factor selected in the games">
              <select
                className="form-select"
                onChange={({ target }) => setRisk(target.value as PlinkoRisk)}>
                {riskValues.map((v) => (
                  <option value={v} className="selectOption">
                    {v}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="inputsRow">
            <Input
              disabled
              title="Server Seed (SHA-256)"
              subTitle="This is the SHA-256 hash of the Server Seed shown prior to rotation of the seed."
              value={serverHash}
            />
          </div>

          <div className="inputsRow">
            <Input
              disabled
              title="Result"
              subTitle="This is the result/outcome of the game calculated locally in your game. It should match that shown at the main site."
              value={result}
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

export default Plinko;
