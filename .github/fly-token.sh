# Sourced by the Fly workflows (.github/workflows/fly-*.yml): sets FLY_API_TOKEN from the
# FLY_API_TOKEN repository secret, passed in as FLY_API_TOKEN_SAVED.
#
# A token copied from a terminal window can pick up line breaks where the window wrapped
# it, invisible characters, or text around it (the prompt, the command). A Fly token is one
# line of printable ASCII: "FlyV1 " and then comma-separated fm..._ parts, no spaces.
export LC_ALL=C   # count bytes; a Fly token is plain ASCII
raw="$FLY_API_TOKEN_SAVED"
case "$raw" in *$'\n'*|*$'\r'*) breaks=yes ;; *) breaks=no ;; esac
lines=$(printf '%s' "$raw" | tr -d '\r')
clean=$(printf '%s' "$lines" | tr -cd '\12\40-\176')   # keep line breaks and printable ASCII
odd=$(( ${#lines} - ${#clean} ))
# Find the line with the token, then join the lines that follow only while they hold
# nothing but token characters (a wrapped token); stop at the first that holds anything
# else (the next prompt). Count what is left out, never show it.
token=""; state=find; before=0; after=0
while IFS= read -r line || [ -n "$line" ]; do
  pad="${line##*[! ]}"; line="${line%"$pad"}"   # consoles pad wrapped lines with spaces
  if [ "$state" = find ]; then
    case "$line" in
      *FlyV1*) lead="${line%%FlyV1*}"; rest="${line#*FlyV1}"; rest="${rest#"${rest%%[! ]*}"}" ;;
      *fm2_*|*fm1r_*|*fm1a_*) lead="${line%%fm[12]*}"; rest="${line#"$lead"}" ;;
      *) before=$(( before + ${#line} )); continue ;;
    esac
    before=$(( before + ${#lead} ))
    token="${rest%%[!A-Za-z0-9+/=_,-]*}"; after=$(( after + ${#rest} - ${#token} ))
    if [ "${#token}" -eq "${#rest}" ]; then state=take; else state=done; fi
  elif [ "$state" = take ]; then
    if [ -n "$line" ] && [ -z "${line//[A-Za-z0-9+\/=_,-]/}" ]; then token="$token$line"; else after=$(( after + ${#line} )); state=done; fi
  else
    after=$(( after + ${#line} ))
  fi
done <<< "$clean"
body="$token"
t="FlyV1 $body"; [ -n "$body" ] || t=""
echo "::add-mask::$t"
# The token's shape only, never any part of it.
case "$body" in fm*_*) shape=yes ;; *) shape=no ;; esac
parts=$(printf '%s' "$body" | tr ',' '\n' | grep -c . || true)
echo "saved secret: ${#raw} bytes, line breaks: $breaks, invisible or non-ASCII bytes removed: $odd"
echo "text left out before the token: $before characters, after it: $after characters"
echo "token used: ${#t} characters, parts: $parts, looks like a Fly token: $shape"
if [ -z "$t" ]; then echo "::error::The FLY_API_TOKEN repository secret is empty or missing"; return 1; fi
export FLY_API_TOKEN="$t"
unset raw lines clean token body t
