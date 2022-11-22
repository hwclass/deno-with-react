import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";

import assets from './routes/assets.ts'
import home from './routes/home.tsx'

serve({
  "/": home,
  "/assets/:path": assets
});