import { Interface } from "ethers/lib/utils";
import RubiconRFQ from "./RubiconRFQ.json";

export const RFQ_ABI = new Interface(RubiconRFQ);

export default RFQ_ABI;