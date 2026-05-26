"use client";
import { IconCalendar } from "./icons";

export default function TranscriptCard() {
  return (
    <div className="transcript">
      <div className="hero-sticker">Live · 00:42 ago</div>
      <div className="transcript-head">
        <div className="left">
          <div className="avatar">SK</div>
          <div>
            <div className="name">Sarah Kelly</div>
            <div className="sub">+44 7700 900 124 · Bristol</div>
          </div>
        </div>
        <div className="status">Qualified</div>
      </div>

      <div className="transcript-body">
        <div className="tline missed" style={{ animationDelay: "0ms" }}>
          <div className="ts">14:02</div>
          <div className="body-cell">
            <span className="tag">Missed call</span>
            <div className="msg">Caller rang while you were on the job — voicemail not left.</div>
          </div>
        </div>
        <div className="tline system" style={{ animationDelay: "120ms" }}>
          <div className="ts">14:02</div>
          <div className="body-cell">
            <span className="tag">BackIn5 · Text-back</span>
            <div className="msg">&quot;Hi Sarah — sorry I missed your call, I&apos;m on a job. I can get back to you within 5 minutes. Quick question: what do you need help with?&quot;</div>
          </div>
        </div>
        <div className="tline customer" style={{ animationDelay: "240ms" }}>
          <div className="ts">14:03</div>
          <div className="body-cell">
            <span className="tag">Sarah</span>
            <div className="msg">Kitchen tap is leaking under the sink. Bit urgent — got a dinner party Friday.</div>
          </div>
        </div>
        <div className="tline system" style={{ animationDelay: "360ms" }}>
          <div className="ts">14:04</div>
          <div className="body-cell">
            <span className="tag">BackIn5 · Qualifying</span>
            <div className="msg">Got it. Captured job type, urgency and address. Holding Thursday 9:30am in your diary.</div>
            <div className="meta">
              <span><b>Job</b> Leak repair</span>
              <span><b>Urgency</b> 48h</span>
              <span><b>Postcode</b> BS6 5HE</span>
            </div>
          </div>
        </div>
        <div className="tline booked" style={{ animationDelay: "480ms" }}>
          <div className="ts">14:04</div>
          <div className="body-cell">
            <span className="tag">Booked</span>
            <div className="msg">Confirmation sent. Added to your morning brief.</div>
          </div>
        </div>
      </div>

      <div className="transcript-foot">
        <div className="stat"><b>3m 42s</b> start to booked</div>
        <div className="booked-pill">
          <IconCalendar size={14} />
          Thursday 09:30
        </div>
      </div>
    </div>
  );
}
