import getAllTokenIds from '@/utils/getAllTokenIds';
import getTokenMetadata from '@/utils/getTokenMetadata';
import client from '@/utils/thirdwebClient';
import { MediaRenderer } from 'thirdweb/react';
import { download, resolveScheme } from 'thirdweb/storage';

export default async function TokenIds() {
  const tokenIds = await getAllTokenIds();

  const tokenUriPromises =
    tokenIds?.map(async (id) => {
      const metadata = await getTokenMetadata(id);
      console.log({ metadata });

      return { metadata, tokenId: id };
    }) || [];

  const nfts = await Promise.all(tokenUriPromises);
  console.log({ nfts });

  const filePromises = nfts?.map(async (nft) => {
    const file = await download({
      client,
      uri: nft.metadata as string,
    });

    const jsonFile = await file.json();
    console.log({ jsonFile });

    return { ...jsonFile, image: resolveScheme(jsonFile.image) };
  });

  const files = await Promise.all(filePromises);

  console.log({ files });

  return (
    <div>
      <h1>Token ids</h1>
      <div>
        {files.map((file) => (
          <MediaRenderer key={file.name} src={file.image} alt='Image' client={client} />
        ))}
      </div>
    </div>
  );
}
