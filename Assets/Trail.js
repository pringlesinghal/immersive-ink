//@input SceneObject obj1
//@input SceneObject obj2
//@input Asset.Material mat




let meshVisual = script.sceneObject.createComponent("Component.RenderMeshVisual")

script.createEvent("UpdateEvent").bind(()=>{
    var builder = new MeshBuilder([
      { name: 'position', components: 3 }, //attribute 1
    ]);
    
    builder.topology = MeshTopology.LineStrip;
    builder.indexType = MeshIndexType.UInt16;
    
    let pos1 = script.obj1.getTransform().getWorldPosition();
    let pos2 = script.obj2.getTransform().getWorldPosition();

    builder.appendVerticesInterleaved([
      // Position      Index
      pos1.x,
      pos1.y,
      pos1.z, //0
       pos2.x,
      pos2.y,
      pos2.z, //0
    ]);
    builder.appendIndices([0, 1]);
    // print("shkfkdsdsfkh")
    meshVisual.mesh = builder.getMesh();
    meshVisual.mainMaterial = script.mat;
    builder.updateMesh();
})

