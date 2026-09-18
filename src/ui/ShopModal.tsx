import { CROP_LIST, CROPS } from '../data/crops'
import { useFarmStore } from '../store/useFarmStore'

export function ShopModal() {
  const open = useFarmStore((state) => state.shopOpen)
  const coins = useFarmStore((state) => state.coins)
  const seeds = useFarmStore((state) => state.seeds)
  const harvest = useFarmStore((state) => state.harvest)
  const buySeed = useFarmStore((state) => state.buySeed)
  const sellCrop = useFarmStore((state) => state.sellCrop)
  const sellAll = useFarmStore((state) => state.sellAll)
  const closeShop = useFarmStore((state) => state.closeShop)

  if (!open) return null

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-labelledby="shop-title">
        <div className="modal-head">
          <div>
            <h2 id="shop-title">晨露售货摊</h2>
            <p>现有金币 {coins}</p>
          </div>
          <button type="button" className="ghost-btn" onClick={closeShop}>
            关闭
          </button>
        </div>
        <div className="shop-grid">
          {CROP_LIST.map((crop) => (
            <article key={crop.id} className="shop-card">
              <header>
                <span className="hotbar-swatch" style={{ background: crop.fruitColor }} />
                <strong>{crop.name}</strong>
              </header>
              <p>
                种子 {seeds[crop.id]} · 收获 {harvest[crop.id]}
              </p>
              <p className="shop-price">
                买种 {crop.seedCost} · 卖出 {crop.sellPrice}
              </p>
              <div className="shop-actions">
                <button type="button" onClick={() => buySeed(crop.id)} disabled={coins < crop.seedCost}>
                  买种子
                </button>
                <button type="button" onClick={() => sellCrop(crop.id)} disabled={harvest[crop.id] <= 0}>
                  卖 1 个
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="modal-foot">
          <span>生长越久的作物卖得越贵：{CROP_LIST.map((crop) => `${crop.name} ${CROPS[crop.id].sellPrice}`).join(' / ')}</span>
          <button type="button" onClick={() => sellAll()}>
            全部卖出
          </button>
        </div>
      </div>
    </div>
  )
}
