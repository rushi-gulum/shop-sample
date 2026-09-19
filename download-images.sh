#!/bin/bash
# Download curated Unsplash product images into public/products
mkdir -p /home/z/my-project/public/products
cd /home/z/my-project/public/products

declare -A imgs=(
  ["headphones"]="photo-1505740420928-5e560c06d30e"
  ["headphones2"]="photo-1583394838336-acd977736f90"
  ["earbuds"]="photo-1590658268037-6bf12165a8df"
  ["speaker"]="photo-1608043152269-423dbba4e7e1"
  ["studiospeakers"]="photo-1545454675-3531b543be5d"
  ["smartphone"]="photo-1511707171634-5f897ff02aa9"
  ["laptop"]="photo-1496181133206-80ce9b88a853"
  ["keyboard"]="photo-1587829741301-dc798b83add3"
  ["mouse"]="photo-1527864550417-7fd91fc51a46"
  ["monitor"]="photo-1527443224154-c4a3942d3acf"
  ["smartwatch"]="photo-1546868871-7041f2a55e12"
  ["tablet"]="photo-1544244015-0df4b3ffc6b0"
  ["tv"]="photo-1593359677879-a4bb92f829d1"
  ["drone"]="photo-1473968512647-3e447244af8f"
  ["camera"]="photo-1502920917128-1aa500764cbd"
  ["book"]="photo-1544947950-fa07a98d237f"
  ["book2"]="photo-1589998059171-988d887df646"
  ["book3"]="photo-1555066931-4365d14bab8c"
  ["serum"]="photo-1620916566398-39f1143ab7be"
  ["lipstick"]="photo-1586495777744-4413f21062fa"
  ["facemask"]="photo-1570172619644-dfd03ed5d881"
  ["toothbrush"]="photo-1607613009820-a29f7bb81c04"
  ["sneakers"]="photo-1549298916-b41d501d3772"
  ["backpack"]="photo-1553062407-98eeb64c6a62"
  ["wallet"]="photo-1627123424574-724758594e93"
  ["airfryer"]="photo-1585659722983-3a675dabf23d"
  ["espresso"]="photo-1517668808822-9ebb02f2a0e6"
  ["kitchen"]="photo-1556909114-f6e7ad7d3136"
  ["vacuum"]="photo-1558317374-067fb5f30001"
  ["knives"]="photo-1593618998160-e34014e67546"
  ["dumbbells"]="photo-1583454110551-21f2fa2afe61"
  ["yogamat"]="photo-1592432678016-e910b452f9a2"
  ["helmet"]="photo-1558618666-fcd25c85cd64"
  ["oliveoil"]="photo-1474979266404-7eaacbcd87c5"
  ["matcha"]="photo-1536256263959-770b48d82b0a"
  ["coldbrew"]="photo-1461023058943-07fcbe16d735"
  ["robotkit"]="photo-1563207153-f403bf289096"
  ["lego"]="photo-1587654780291-39c9404d746b"
  ["teddy"]="photo-1559454403-b8fb88521f11"
  ["boardgame"]="photo-1610889556528-9a770e32642f"
  ["hero-tech"]="photo-1498049794561-7780e7231661"
  ["hero-audio"]="photo-1484704849700-f032a568e944"
  ["hero-home"]="photo-1556228453-efd6c1ff04f6"
)

ok=0; fail=0
for name in "${!imgs[@]}"; do
  id="${imgs[$name]}"
  url="https://images.unsplash.com/${id}?w=640&q=75&fm=jpg&fit=crop"
  out="${name}.jpg"
  if [ -s "$out" ]; then ok=$((ok+1)); continue; fi
  code=$(curl -s -o "$out" -w "%{http_code}" --max-time 15 "$url")
  size=$(stat -c%s "$out" 2>/dev/null || echo 0)
  if [ "$code" = "200" ] && [ "$size" -gt 5000 ]; then
    ok=$((ok+1)); echo "OK  $name ($size bytes)"
  else
    fail=$((fail+1)); echo "FAIL $name code=$code size=$size"; rm -f "$out"
  fi
done
echo "DONE ok=$ok fail=$fail"
