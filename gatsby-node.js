const dfxJson = require("./dfx.json");
const webpack = require("webpack");
const path = require("path");

let localCanisters, prodCanisters, canisters;

function initCanisterIds() {
  try {
    localCanisters = require(path.resolve(
      ".dfx",
      "local",
      "canister_ids.json"
    ));
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production");
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"));
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local");
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local");

  canisters = network === "local" ? localCanisters : prodCanisters;

  for (const canister in canisters) {
    process.env[canister.toUpperCase() + "_CANISTER_ID"] =
      canisters[canister][network];
  }
}
initCanisterIds();

const isDevelopment = process.env.NODE_ENV !== "production";
let internet_identity_canister = process.env.INTERNET_IDENTITY_CANISTER_ID

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: "development",
        DOOCOINS_CANISTER_ID: canisters["doocoins"],
        II_URL: isDevelopment
        ? `http://localhost:8000?canisterId=${internet_identity_canister}#authorize`
        : "https://identity.ic0.app/#authorize",
      }),
    ],
  });
};