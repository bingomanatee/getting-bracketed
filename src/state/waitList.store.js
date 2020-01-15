import { ValueStream } from "@wonderlandlabs/looking-glass-engine";
import { proppify } from "@wonderlandlabs/propper";
import uuid from "uuid/v4";
import _ from "lodash";

class ListItem {
  constructor(label) {
    this.label = label;
    this.checked = false;
    this.id = uuid();
  }

  toggleChecked() {
    this.checked = !this.checked;
  }

  clone() {
    let i = new ListItem(this.label);
    i.id = this.id;
    i.stack = this.stack;
    i.processed = this.processed;
    i.checked = this.checked;
    return i;
  }

  get balanced() {
    if (!this.processed) return false;
    let balanced = this.stack.length;

    this.stack.forEach(item => {
      if (balanced) {
        balanced = !(item.isOpener || item.isCloser);
      }
    });

    return balanced;
  }
}

proppify(ListItem)
  .addProp("label", "", "string")
  .addProp("id", "", "string")
  .addProp("processed", false, "boolean")
  .addProp("stack", [], "array")
  .addProp("checked", false, "boolean");

export default new ValueStream("waitState")

  .property("speed", 500, "integer")
  .method("changeSpeed", (s, e) => {
    console.log("change speed event: ", e);
    s.do.setSpeed(Number.parseInt(e.target.value, 0));
  })
  .property("processing", "", "string")
  .method("getProcessingItem", s => {
    try {
      const p = s.my.processing;
      console.log("getProcessingItem: for ", p);
      if (!p) {
        console.log("getProcessingItem: no processing");
        return null;
      }
      const match = s.my.items.find(i => i.id === p);
      if (match) {
        console.log("returning match", match);
        return match;
      }
      console.log("cannot find item with id ", p, "in", s.my.items);
    } catch (err) {
      console.log("error in getProcessingItem: ", err);
    }
  })
  .method("itemById", (s, id) => {
    console.log("looking for id ", id, "in", s.my.items);
    const match = _.find(s.my.items, { id });
    console.log("--- found ", match);
    return match;
  })
  .method(
    "complete",
    (s, id, stack) => {
      const item = s.do.itemById(id);
      if (item) {
        item.stack = stack;
        item.processed = true;
        s.do.setItems(s.my.items.map(i => i.clone()));
        s.do.processNext();
      } else {
        console.log("error = cannot complete ", id);
        s.do.setProcessing("");
      }
    },
    true
  )
  .method("processNext", s => {
    let list;
    console.log(
      "processNext - process only checked == ",
      s.my.processOnlyChecked
    );
    if (s.my.processOnlyChecked) {
      s.do.checkedItems().forEach(i => {
        if (i.processed) i.checked = false;
      });
      // uncheck all the completed items

      list = s.do.checkedItems();
    } else {
      list = s.do.unprocessedItems();
    }
    console.log("process next; un-done = ", list);
    if (list.length) {
      s.do.setProcessing(_.first(list).id || "");
    } else {
      s.do.setProcessing("");
    }
    console.log("processing is now ", s.my.processing);
  })
  .method("unprocessedItems", (s, onlyChecked = false) => {
    let list = onlyChecked ? s.do.checkedItems() : s.my.items;
    return list.filter(i => !i.processed);
  })
  .method("checkedItems", stream => {
    return stream.my.items.filter(s => s.checked);
  })
  .property("processOnlyChecked", false, "boolean")
  .method("process", (s, firstTime) => {
    if (s.my.processing) return s.my.processing;

    if (firstTime) {
      // train the processing loop to either focus on selected
      // or all items.
      if (s.do.checkedItems().length) {
        s.do.setProcessOnlyChecked(true);
      } else {
        s.do.setProcessOnlyChecked(false);
      }
    }

    let items = s.do.unprocessedItems(s.my.processOnlyChecked);

    if (items.length) {
      const first = _.first(items);
      s.do.setProcessing(_.get(first, "id", ""));
      return s.my.processing;
    } else {
      s.do.setProcessing("");
    }
    return false;
  })
  .property("items", [], "array")
  .method("hasChecked", store => {
    let items = [...store.my.items];
    while (items.length) {
      if (items.pop().checked) {
        return true;
      }
    }
    return false;
  })
  .method("hasItems", s => _.get(s, "my.items.length"))
  .method("clearChecked", s => {
    if (s.my.processing) return;
    s.do.setItems(s.my.items.filter(i => !i.checked));
  })
  .method("toggleChecked", (s, item) => {
    if (s.my.processing) return;
    if (!item) {
      console.log("attempt to toggle without target");
      return;
    }
    console.log("toggling", item);
    item.toggleChecked();
    s.do.setItems([...s.my.items]);
  })
  .method("addItem", (s, label) => {
    s.do.setItems([new ListItem(label), ...s.my.items]);
  });
