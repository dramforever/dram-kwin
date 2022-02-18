#!/bin/sh
tmp="$(mktemp --suffix=.tar)"
trap "rm -f $tmp" EXIT

git archive -o "$tmp" HEAD

if kpackagetool5 --type=KWin/Script --show dram-kwin >/dev/null 2>/dev/null; then
    kpackagetool5 --type=KWin/Script -u "$tmp"
else
    kpackagetool5 --type=KWin/Script -i "$tmp"
fi
