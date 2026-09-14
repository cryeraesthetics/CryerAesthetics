// Reading a product label from a photo needs a vision API key that hasn't
// been configured yet, so "Add by photo" stores the photo and leaves the
// name open for the member to type — clearly labeled as manual entry
// rather than pretending to read it. Swap this out once a vision provider
// is connected (see SETUP.md).
export async function mockReadLabel(): Promise<{ name: string; failed: boolean }> {
  await new Promise((r) => setTimeout(r, 400));
  return { name: '', failed: true };
}
