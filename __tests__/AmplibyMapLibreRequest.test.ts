import AmplifyMapLibreRequest from "../src/AmplifyMapLibreRequest";

describe("AmplifyMapLibreRequest", () => {
  test("Constructor test", () => {
    const mockCreds = {
      accessKeyId: "accessKeyId",
      sessionToken: "sessionTokenId",
      secretAccessKey: "secretAccessKey",
      identityId: "identityId",
      authenticated: true,
      expiration: new Date(),
    };
    const amplifyRequest = new AmplifyMapLibreRequest(mockCreds);
    expect(amplifyRequest.credentials).toBe(mockCreds);
    expect(amplifyRequest.region).toBe("us-west-2");
    expect(typeof amplifyRequest.transformRequest).toBe("function");
  });

  test("transformRequest returned undefined for non amazon related urls", () => {
    const mockCreds = {
      accessKeyId: "accessKeyId",
      sessionToken: "sessionTokenId",
      secretAccessKey: "secretAccessKey",
      identityId: "identityId",
      authenticated: true,
      expiration: new Date(),
    };
    const amplifyRequest = new AmplifyMapLibreRequest(mockCreds);
    expect(amplifyRequest.transformRequest("https://example.com", "any")).toBe(
      undefined
    );
  });

  test("transformRequest queries amazon location services for Style requests and adds sigv4 auth", () => {
    const mockCreds = {
      accessKeyId: "accessKeyId",
      sessionToken: "sessionTokenId",
      secretAccessKey: "secretAccessKey",
      identityId: "identityId",
      authenticated: true,
      expiration: new Date(),
    };
    const amplifyRequest = new AmplifyMapLibreRequest(mockCreds);
    const request = amplifyRequest.transformRequest("example.com", "Style");
    expect(request.url).toContain("maps.geo");
    expect(request.url).toContain("X-Amz-Signature");
  });
});