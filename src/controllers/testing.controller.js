import { asynchandler } from "../utils/asyncHandler.js";
import { apierror } from "../utils/apiError.js";
import { apiresponse } from "../utils/apiResponse.js";

const testingController = asynchandler(async (req, res) => {
  // This is a placeholder for the testing controller logic
  // You can implement your testing logic here
  // For example, you can return a simple response to test the endpoint

  res.status(200).json(new apiresponse(200, null, "Testing controller is working"));
});

export { testingController };