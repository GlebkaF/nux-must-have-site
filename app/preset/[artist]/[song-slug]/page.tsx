import { Metadata } from "next";
import { PresetDetails } from "components/PresetDetails";
import { RelatedPresets } from "components/RelatedPresets";
import { Preset } from "lib/public/interface";
import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { createPresetLink } from "lib/utils/urls";

interface PresetPageProps {
  params: {
    artist: string;
    "song-slug": string;
  };
}

export async function generateMetadata({
  params,
}: PresetPageProps): Promise<Metadata> {
  const preset = presets.find((p) => p.slug === params["song-slug"]);

  if (!preset) {
    return {
      title: "Preset Not Found",
      description: "The requested preset could not be found.",
    };
  }

  const title = `${preset.origin.song} ${preset.origin.part} – NUX Mighty Plug Pro & Mighty Space Patch | Free Guitar Preset`;
  const description = `Play ${preset.origin.song} ${preset.origin.part} with authentic tone using this free NUX Mighty Plug Pro and Mighty Space patch. Download the guitar preset, inspired by ${preset.origin.artist.title}, and load it on your NUX Mighty device.`;
  const imageUrl = preset.origin.imageUrl ?? "/images/cover/default-cover.png";
  const imageUrlWithProtocol = imageUrl.startsWith("http")
    ? imageUrl
    : `https://nxrig.com${imageUrl}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: [imageUrlWithProtocol],
      url: "https://nxrig.com" + createPresetLink(preset),
      siteName: "NUX Must Have",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrlWithProtocol],
    },
    authors: [{ name: "NUX Must Have" }],
    category: "Guitar Presets",
    keywords: [
      preset.origin.artist.title,
      "Guitar Tone",
      "NUX Mighty Plug Pro",
      "NUX mp3",
      "NUX Mighty Space",
      "Guitar Preset",
      "NUX Mighty Devices",
    ],
  };
}

export async function generateStaticParams() {
  return presets.map((preset) => ({
    artist: preset.origin.artist.slug,
    "song-slug": preset.slug,
  }));
}

async function getPreset(slug: string): Promise<Preset | null> {
  const preset = presets.find((p) => p.slug === slug);
  return preset || null;
}

export default async function PresetPage({ params }: PresetPageProps) {
  const preset = await getPreset(params["song-slug"]);

  if (!preset) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto">
            <h1>Preset Not Found</h1>
          </div>
        </main>
        <Footer>
          <div className="container mx-auto">
            <p className="text-gray-300">
              The requested preset could not be found.
            </p>
          </div>
        </Footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto pb-12 px-4 py-8">
          <PresetDetails preset={preset} />
          <RelatedPresets
            title={`More presets by ${preset.origin.artist.title}`}
            presets={presets.filter(
              (p) => p.origin.artist.slug === preset.origin.artist.slug,
            )}
            currentPresetId={preset.id}
          />
        </div>
      </main>
      <Footer>
        <div className="container mx-auto">
          <p className="text-gray-300">
            This patch for {preset.origin.song} {preset.origin.part} by{" "}
            {preset.origin.artist.title} is designed for the NUX Mighty Plug Pro
            and NUX Mighty Space. It recreates the original tone with authentic
            dynamics, perfect for practicing the song or performing live.
            Download the patch, load it into your device, and play with the
            legendary {preset.origin.artist.title} sound.
          </p>
        </div>
      </Footer>
    </div>
  );
}
