import waitUntil from "async-wait-until";
import { assert } from "chai";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import fetch from "isomorphic-fetch";

import RepresentativeInstance from "../src/components/InstancePages/RepresentativeInstance";

configure({ adapter: new Adapter() });

describe("District Instance test", function() {
  const match = {
    params: {
      id: "F000467"
    }
  };
  it("District Instance page doesn't have any data at first render", function() {
    const root = shallow(<RepresentativeInstance match={match} />);
    assert.equal(root.state("representative").id, null);
  });

  it("District Instance page loads correctly from api", function(done) {
    const root = shallow(<RepresentativeInstance match={match} />);
    waitUntil(() => root.state("representative").id != null).then(() => {
      assert.equal(root.state("representative").id, "F000467");
      assert.equal(root.state("representative").full_name, "Abby Finkenauer");
      done();
    });
  });
});
