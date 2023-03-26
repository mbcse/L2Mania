import flowCatalog from 'flow-catalog'

const main = async () => {
  const addressMap = await flowCatalog.getAddressMaps()
  console.log(await flowCatalog.scripts.getNftCatalog(addressMap))
}

main()
